# DevFest Abakaliki 2024 - Admin 

This directory contains a React + TypeScript + Vite frontend for select persons who can add attendees. The idea is if people were registered by paying via other means (cash or bank transfers), the admin can enter their details to complete their registration. In this admin site, there is also a table display of all registered attendees.

## Authentication

Only "admin"s should access this website. Each [page](./src/pages) and [App.tsx](./src/App.tsx) has an [onAuthStateChanged](https://firebase.google.com/docs/auth/web/manage-users#get_the_currently_signed-in_user) check in their "on-load" [`useEffect`](https://react.dev/learn/synchronizing-with-effects) to ensure that only signed-in users who have the `admin` [customClaims](https://firebase.google.com/docs/auth/admin/custom-claims) in their Firebase Authentication User object can access the other parts of the site. Otherwise, the check redirects the user to `/auth`.

The `/auth` page contains a "Sign In With Google" button. The first time an account signs in, they can't access the site. They will need to reach out to the developers to grant them the `admin` customClaims. After that is done, the user will have to sign out (required for the change to reflect) and sign in once again. They could now access the site. If the devs don't grant the customClaims, then they can't have access.

These customClaims are also important because the Cloud Function that adds attendees will fail if the caller is not from this admin website (verified through AppCheck) and doesn't have the customClaims. In addition, read access to the attendees collection from firestore is only available to authenticated users that have the `admin` customClaims.

## Adding Attendees

The `/add` page contains a form with five fields (name, email, phone, school, and category). "School" is a dropdown to select either EBSU, FUNAI, or Not Applicable. "Category" is a dropdown to select either Premium (₦3,000) or Luxury (₦10,000). The other personal info fields have their proper input validation. The "phone" field expects a valid Nigerian phone number formatted in e164 (international) format. 

Clicking the "Add" button validates the form. If validated, the `adminAddAttendee` is called with the filled form's data. If addition is successful, the page navigates to `/` and displays the attendees table with this latest added attendee on the top. 

## Attendees Table

The landing page (`/`) for this admin website displays the list of registered attendees in a tabular format. These attendees' data are directly pulled from the `attendees` collection in Firestore. The table displays all attendees whether they were added by admins or they had registered through Paystack (on the main website). The table's data is always sorted in descending order: that is, latest registered attendees before earlier ones. The table has a paginator to allow admins to view other attendees not in scope and to change the number of attendees per page in the table. 

## Miscellaneous

### UI Elements

[Tailwind CSS](https://tailwindcss.com) and [PrimeReact](https://primereact.org) power the UI for this admin website. Tailwind is used for overall styling and PrimeReact helps with the dropdowns and toasting feedback on activity.

### Firebase Analytics

Firebase Analytics record micro events across admin actions in this website. From logging in, to adding attendees, fetching them, and interacting with the paginator.
