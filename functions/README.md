# DevFest Abakaliki 2024 - Cloud Functions

This directory hosts Typescript backend code that are shared across the main and admin frontends. It includes [`onCall`](https://firebase.google.com/docs/functions/callable) and [`onRequest`](https://firebase.google.com/docs/functions/http-events) cloud functions that help with managing admins, attendees, and payments. On successful registration, attendees also receive ticket confirmation emails, thanks to Cloud Functions and [Google App Script](https://developers.google.com/apps-script).

## Paystack Redirect Flow

[Paystack](https://paystack.com) is a payment gateway you can use to accept payments in Nigeria. You can [accepts payments](https://paystack.com/docs/payments/accept-payments) on the web with Paystack either via Popup (directly in the frontend) or Redirect (with a custom backend).

DevFest Abakaliki 2024 uses the Redirect flow to accept payments when attendees register or purchase tickets. This is intentional as it gives more control to the payment process. It also allows us to send custom emails on successful registration. This Redirect flow involves 3 steps:

1. Our Backend calls the [Paystack's Initialize](https://paystack.com/docs/api/transaction#initialize) endpoint with data we've set. While calling, we provide a callback URL to Paystack. Paystack's Initialize endpoint responds with a specific payment URL.
2. We redirect the user to this payment URL in our frontend. When the user is done with Paystack, Paystack will redirect the user to the callback URL that we provided when initializing.
3. In the callback URL handler, our backend will check the status of payment by calling [Paystack's Verify](https://paystack.com/docs/api/transaction#verify) endpoint. If the user paid, then we register them as an attendee, otherwise we ignore.

On our backend side, we have to handle initialization and verification of payments. As such, we have Cloud Functions that serve those purposes.

### `initPayment`

[`initPayment`](./src/init-payment.ts) is an [`onCall`](https://firebase.google.com/docs/functions/callable) Cloud Function that should be called ONLY by the main [devfestabakaliki.com](https://devfestabakaliki.com) website.

The main frontend collects attendees' input info (name, email, phone, school, and category) to register the attendees. The "School" is either EBSU, AE-FUNAI, or Not Applicable. The "Category" is either Premium (₦3,000) or Luxury (₦10,000). The frontend then calls `initPayment` with the form inputs AND the current window location (callerHref). callerHref is necessary because at the end of the entire Paystack Redirect flow, the user will be returned back to this callerHref that they started from.

`initPayment` does the following in listed order:

- Validates the input info. If any is missing or not as expected, it throws, otherwise:
- Checks the `attendees` collection in Firestore if any attendee document is found with the provided email. If found, it throws, otherwise:
- Checks the `payments` collection in Firestore if any payment document is found with the provided email and amount (gotten from category). If any is found, it updates the firestore payment info with the current inputs and returns the previously saved payment URL and reference, otherwise:
- Calls the Paystack Initialize endpoint. If the call wasn't successful or the return data wasn't as expected, it throws, otherwise:
- Extracts the payment URL and payment reference gotten from Paystack.
- Creates a payment document in the `payments` collection in Firestore whose document ID is the reference and whose contents include the input infos, callerHref, payment URL, reference, and init timestamp.
- Returns the payment URL and reference.

The frontend that called this function redirects the user to the returned payment URL. It also catches any thrown errors and gives feedback to the user (like when a registered attendee's email was provided or if supposedly Paystack is down, (abeg they should never be ooo)).

### `checkPayment`

[`checkPayment`](./src/check-payment.ts) is an [`onRequest`](https://firebase.google.com/docs/functions/http-events) Cloud Function that Paystack calls after the user is done with payments.

Paystack appends the reference as a query (`?refence=...`) to `checkPayment`. `checkPayment` in turn checks the reference, handles successful payments, and then redirects the user to the original callerHref for the given session while equally appending the reference to callerHref as a query (`?refence=...`).

`checkPayment` is public. Anyone can call it or call it with or without references (that could also be invalid). As such, `checkPayment` vigorously carries out checks and returns JSON with error details if someone provides an invalid transaction reference, if things don't go well with Paystack or within our backend.

`checkPayment` does the following in listed order:

- Extracts the reference from the request's query. In none or an invalid one is found, it responds with error-details JSON, otherwise:
- Checks the `payments` collection in Firestore for the document whose ID is the provided reference. If none is found, it responds with error-details JSON, otherwise:
- Extracts callerHref and paidTime from the payment document.
  If there is a valid paidTime, it means the reference has already been evaluated, redirects the user to the saved callerHref while appending the reference. Otherwise:
- Calls the Paystack Verify endpoint. If the call wasn't successful or the return data wasn't as expected, it responds with error-details JSON, otherwise:
- Completes the user registration by creating an attendee document in the `attendees` collection and sends the attendee ticket confirmation email.
- Updates the payment document with paidTime gotten from the Paystack response while also deleting the saved payment URL (which has now become invalid).
- Redirects the user to the originally saved callerHref (from where redirections began) while appending the payment reference.

Redirecting the user to the callerHref effectively ends the Redirect flow since this callerHref is the main frontend from which the user came from. However, the frontend needs to programmatically know what happened during the redirections and give the user appropriate feedback. For this reason, our backend also exposes another helper function that suits the purpose (`checkReference`).

### `checkReference`

[`checkReference`](./src/check-reference.ts) is an onCall Cloud Function that takes a reference and returns JSON indicating the result of the payment with the provided reference. If the payment wadn't successful, the JSON will be `{ "status": false }`. Otherwise, the JSON will be `{ "status": true, "ticket": "DFAI24xxx" }` where "xxx" represents the attendee's numeric ID (the nth registered attendee).

In the frontend, if the JSON response has a `false` status, nothing is showed to the user (the user already knows the cancelled or incompletion of the payment). On the other hand, if the JSON response has `true` status, the frontend should animate congrats, pop confetti, and show their ticket alongside next steps (sharing the event), given that the registration was successful.

## Admin Adding Attendees

The [admin](../admin) frontend gives select persons the ability to add or register attendees that had paid through other means (cash or bank transfer). When these admins add attendees, they are actually calling the `adminAddAttendee` function.

### adminAddAttendee

[`adminAddAttendee`](./src/admin-add-attendee.ts) is an onCall Cloud Function that takes attendee input info, validates them, and simply registers the attendee.

The expected attendee input info is the same as that provided to `initPayment` (name, email, phone, school, and category). The validation of input info is done by a shared [`validateAttendee`](./src/validate-attendee.ts) helper method. Both `adminAddAttendee` and `initPayment` onCall cloud functions use it.

After validating the input info, `adminAddAttendee` completes the user registration exactly as `checkPayment` does. Infact, they both share the same [`completeRegistration`](./src/complete-registration.ts) helper method for that purpose. This function creates an attendee document in the `attendees` collection and sends the attendee a ticket confirmation email.

The core difference between an admin adding an attendee and an attendee registering themselves by paying through Paystack is in the extra redirections and validations necessary for integrating Paystack. Otherwise, it is all "capture user info" and then "complete the registration".

## Completing Registrations

Completing a Registration is creating a new attendee document and sending the attendee a ticket cconfirmation email. The new attendee document contains the validated input info for that attendee alongside the following properties:

- `payment`: Which is either `admin - ADMIN-NICKNAME` or `paystack - PAYMENT-REFERENCE`. This is provided to the [`completeRegistration`](./src/complete-registration.ts) function by its callers.
- `id`: The attendee's numeric ID or the nth registered attendee at the point the registration was completed.
- `ticket`: The ID, padded with zeros to be 3 characters, and prefixed with DFAI24 (short for DevFest AbakalikI 2024). So all tickets will have the format of "DFAI24xxx". This setup easily reconciles admin additions and paystack payments.
- `timestamp`: When the registration was completed.

After saving the firestore document, the function serializes the new attendee document's content into a URL query string and appends it to the SEND_EMAIL endpoint obtained from `.env` file.

SEND_EMAIL endpoint is a deployed [Google App Script](https://developers.google.com/apps-script) Web App that receives the registered attendee infos and sends a customized email on behalf of GDG Abakaliki. The AppScript also saves the infos into a private Google Sheet.

This setup is a cheap and effective way of sending customized emails without much complexity and just for event registrations. It also allows us to have the same attendee infos in two separate places: Firestore and Google Sheets.

Having them in Firestore enables us to display them in the Admin portal. Having them in Google Sheets eases email or phone number exports for any future communications.

If the email is successfully sent, the `completeRegistration` method updates the newly created attendee document with an `emailSent` boolean as `true`.

There is also an `adminRetrySendEmail` onCall Cloud Function that admins can use to retry the sending of emails if in case attendees were successfully registered but there was a failure in the previous send email process.

## Admin Access

We use Firebase Authentication to sign in the admins with Google in the admin frontend. To be sure that the right persons are accessing Firebase resources (firestore and functions) as admins, we also use [customClaims](https://firebase.google.com/docs/auth/admin/custom-claims) on the User object to ensure the user is an admin.

A Firebase Authentication user can only be granted customClaims through the Firebase Admin SDK. This SDK is essentially what we have in Firebase Cloud Functions. So, we can only upgrade users to admin from within here.

Granting admin access is a delicate stuff. For that reason the cloud functions that do those are commented out in [index.ts](./src/index.ts) with comments on how to only use them locally. These functions are declared in the [src/admin-access.ts](./src/admin-access.ts) file. They are `adminGrantAccess` and `adminPendingAccess`. The functions help to check those who signed in (pending) and also help to grant them access.

Please if you are working on this project, don't mistakenly deploy them into production, only use them **locally** but with production Firebase Auth. Also don't mistakenly add them to git uncommented please.

## AppCheck

[Firebase AppCheck](https://firebase.google.com/products/app-check) helps prevent abuse in applications. This project uses it to help ensure that calls to the onCall Cloud Functions are from the expected applications.

`initPayment` and `checkReference` will fail if AppCheck didn't successfully verify and if the appId in the call data does not match the Firebase registered web app for the main frontend.

This is the same with `adminAddAttendee` cloud function. It verifies AppCheck and verifies the caller appId to match that of the admin app. In addition, it checks the auth token in the call data to be sure the caller has the admin customClaims.

These checks are done before the execution of the bodies of these functions. These checks are aimed at securing the entire project.

## Security

Any valuable used in this project was not committed git. Valuables here include: firebase config data and contents of `.env`s (paystack keys, recaptcha keys, appcheck debug tokens, appIds, send email url, ...)

All these are to enhance security. If in case you find a bug, please help indicate and possibly help solve it.

Thanks.
