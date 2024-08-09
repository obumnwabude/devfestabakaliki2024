import 'dotenv/config';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { isEmail } from 'validator';
import { firestore } from './firebase-admin';
import { AttendeeInfo } from './schemas';
import { validateAttendee } from './validate-attendee';

export const adminRetrySendEmail = async (request: CallableRequest) => {
  const { data, auth, app } = request;

  if (!app || app?.appId != process.env.ADMIN_APP_ID) {
    throw new HttpsError('failed-precondition', 'Not called from admin');
  }

  if (!auth || !auth.token.admin) {
    throw new HttpsError('permission-denied', 'Not authorized admin.');
  }

  const { email } = data;
  if (!email || typeof email !== 'string' || !isEmail(email)) {
    throw new HttpsError('invalid-argument', 'Invalid Email');
  }

  const query = await firestore
    .collection('attendees')
    .where('email', '==', email)
    .get();
  if (query.empty) {
    throw new HttpsError('invalid-argument', 'Invalid Email');
  }

  const retrieved = query.docs[0].data();
  if (retrieved.emailSent) return;

  let attendeeInfo: AttendeeInfo;
  try {
    const inputInfo = validateAttendee(retrieved);
    const { amount, payment, id, ticket } = retrieved;
    if (!amount || !payment || !id || !ticket) throw 'Invalid Infos';
    attendeeInfo = { ...inputInfo, amount, payment, id, ticket };
  } catch (e: any) {
    throw new HttpsError('internal', `Couldn't Retrieve Saved: ${e}`);
  }

  const aligned = Object.entries(attendeeInfo).map(([k, v]) => `${k}=${v}`);
  const result = (await (
    await fetch(process.env.SEND_EMAIL_URL + `?${encodeURI(aligned.join('&'))}`)
  ).json()) as { status: boolean; message: string };

  if (result.status) {
    await query.docs[0].ref.update({ emailSent: true });
  } else {
    throw new HttpsError('internal', `Couldn't send email: ${result.message}`);
  }
};
