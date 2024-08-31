import 'dotenv/config';
import { Timestamp } from 'firebase-admin/firestore';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import fetch from 'node-fetch';
import { firestore } from './firebase-admin';
import { AttendeeInputInfo, getAmount } from './schemas';
import { validateAttendee } from './validate-attendee';

export const initPayment = async (request: CallableRequest) => {
  const { data, app } = request;

  if (!app || app?.appId !== process.env.MAIN_APP_ID) {
    throw new HttpsError('failed-precondition', 'Not called from main app');
  }

  let attendeeInputInfo: AttendeeInputInfo;
  try {
    attendeeInputInfo = validateAttendee(data);
  } catch (e: any) {
    throw new HttpsError('invalid-argument', e);
  }
  const amount = getAmount(attendeeInputInfo);

  const callerHref = data.callerHref;
  if (!callerHref) {
    throw new HttpsError('invalid-argument', 'Invalid callerHref link');
  }
  try {
    new URL(callerHref);
  } catch (_) {
    throw new HttpsError('invalid-argument', 'Invalid callerHref link');
  }

  const { email } = attendeeInputInfo;
  const attendeesRef = firestore.collection('attendees');
  let duplicates = await attendeesRef.where('email', '==', email).get();
  if (!duplicates.empty) {
    throw new HttpsError('invalid-argument', `${email} is registered.`);
  }

  const paymentsRef = firestore.collection('payments');
  duplicates = await paymentsRef
    .where('form.email', '==', email)
    .where('form.amount', '==', amount) // also checking amount ensures good UX
    .get();
  if (!duplicates.empty) {
    const { url, reference } = duplicates.docs[0].data();
    if (url && reference) {
      await duplicates.docs[0].ref.set(
        { form: { ...attendeeInputInfo, amount } },
        { merge: true }
      );
      return { url, reference };
    } else {
      // This shouldn't happen
      throw new HttpsError(
        'internal',
        "Can't lack payment url and reference and you are not an attendee"
      );
    }
  }

  const paystackApiKey = process.env.FUNCTIONS_EMULATOR
    ? process.env.PAYSTACK_API_KEY_DEV
    : process.env.PAYSTACK_API_KEY_PROD;

  const callback_url = process.env.FUNCTIONS_EMULATOR
    ? process.env.CALLBACK_URL_DEV
    : process.env.CALLBACK_URL_PROD;

  const result = (await (
    await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // * 100 is required by Paystack to factor in kobo
        metadata: {
          name: attendeeInputInfo.name,
          phone: attendeeInputInfo.phone
        },
        callback_url
      })
    })
  ).json()) as any;

  if (
    result.status &&
    'authorization_url' in result.data &&
    'reference' in result.data
  ) {
    const { authorization_url, reference } = result.data;
    await paymentsRef.doc(reference).set({
      form: { ...attendeeInputInfo, amount },
      callerHref,
      reference,
      url: authorization_url,
      initTime: Timestamp.now()
    });
    return { url: authorization_url, reference };
  } else {
    console.error('Error in Paystack call');
    console.error(result);
    throw new HttpsError('internal', result.message ?? 'Error in Paystack');
  }
};
