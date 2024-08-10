import 'dotenv/config';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { firestore } from './firebase-admin';
import { CheckReferenceResult } from './schemas';

export const checkReference = async (
  request: CallableRequest
): Promise<CheckReferenceResult> => {
  const { data, app } = request;

  if (!app || app?.appId !== process.env.MAIN_APP_ID) {
    throw new HttpsError('failed-precondition', 'Invalid caller');
  }

  const { reference } = data;
  if (!reference) throw new HttpsError('invalid-argument', 'Invalid reference');

  const paymentSnapshot = await firestore.doc(`/payments/${reference}`).get();
  if (!paymentSnapshot.exists) {
    throw new HttpsError('invalid-argument', 'Invalid Reference');
  }

  const {
    paidTime,
    form: { email }
  } = paymentSnapshot.data()!;

  let ticket: string | undefined;
  if (paidTime) {
    const query = await firestore
      .collection('attendees')
      .where('email', '==', email)
      .get();
    if (query.empty) {
      throw new HttpsError('internal', "Couldn't get attendee info");
    } else {
      ticket = query.docs[0].data().ticket;
    }
  }

  return { status: !!paidTime, ...(ticket ? { ticket } : {}) };
};
