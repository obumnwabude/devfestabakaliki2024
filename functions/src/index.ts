import { onCall, onRequest } from 'firebase-functions/v2/https';
import { adminAddAttendee as aaaFn } from './admin-add-attendee';
// import { adminRetrySendEmail as arseFn } from './admin-retry-send-email';
import { checkPayment as checkPaymentFn } from './check-payment';
import { checkReference as checkRefFn } from './check-reference';
import { initPayment as initPaymentFn } from './init-payment';
import { registerAttendeeFree as regFn } from './register-attendee-free';

const opts = { cors: true, enforceAppCheck: true };
export const adminAddAttendee = onCall(opts, aaaFn);
// export const adminRetrySendEmail = onCall(opts, arseFn);
export const checkPayment = onRequest(checkPaymentFn);
export const checkReference = onCall(opts, checkRefFn);
export const initPayment = onCall(opts, initPaymentFn);
export const registerAttendeeFree = onCall(opts, regFn);

// These 2 functions should not enter production or be available to the public.
// They are only here to grant access to requestees but through the firebase
// emulator that is running locally but with production auth.
//
// To use them, uncomment them, then run the following command
//
// firebase emulators:start --only functions
//
// Then visit the adminPendingAccess link that the emulator will give you in a
// browser and see those pending. Copy the uid of a user and paste as a
// URL query parameter to adminGrantAccess link. Equally add a nickname for the
// admin you want to add. That is, add
// ?uid=uid-you-copied&nickname=single-no-space-nickname
// to the end of the second adminGrantAccess link that the emulator gave you and
// send the request. uid and nickname are compulsory, else the call will fail.
// After sending successfully, you would have made the user an admin.
//
// Be sure to comment them back when then done. Please don't leave them
// uncommented in git history. Also, don't leave them uncommented when
// running firebase deploy 🤲🤲🤲.
//
//
// import {
//   adminGrantAccess as grantAccessFn,
//   adminPendingAccess as pendingAccessFn
// } from './admin-access';
//
// export const adminGrantAccess = onRequest(grantAccessFn);
// export const adminPendingAccess = onRequest(pendingAccessFn);
//
