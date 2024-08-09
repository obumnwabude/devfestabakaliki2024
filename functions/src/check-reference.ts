import 'dotenv/config';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { firestore } from './firebase-admin';

export const checkReference = async (request: CallableRequest) => {
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

  return !!paymentSnapshot.data()!.paidTime;
};
