import 'dotenv/config';
import { FieldValue } from 'firebase-admin/firestore';
import { HttpsError } from 'firebase-functions/v2/https';
import { firestore } from './firebase-admin';
import { AttendeeInfo, AttendeeInputInfo, getAmount, Payment } from './schemas';

export const completeRegistration = async (
  inputInfo: AttendeeInputInfo,
  payment: Payment
): Promise<string> => {
  const { email } = inputInfo;

  const attendeesRef = firestore.collection('attendees');
  const duplicates = await attendeesRef.where('email', '==', email).get();
  if (!duplicates.empty) {
    throw new HttpsError('invalid-argument', `${email} is registered.`);
  }

  const id = (await attendeesRef.count().get()).data().count + 1;
  const ticket = `DFAI24${`${id}`.padStart(3, '0')}`;
  const attendeeInfo: AttendeeInfo = {
    ...inputInfo,
    amount: getAmount(inputInfo),
    payment,
    id,
    ticket
  };

  const newAttendeeRef = await attendeesRef.add({
    ...attendeeInfo,
    year: new Date().getFullYear(),
    timestamp: FieldValue.serverTimestamp()
  });

  const aligned = Object.entries(attendeeInfo).map(([k, v]) => `${k}=${v}`);
  const result = (await (
    await fetch(process.env.SEND_EMAIL_URL + `?${encodeURI(aligned.join('&'))}`)
  ).json()) as { status: boolean; message: string };

  if (!result.status) {
    throw new HttpsError(
      'internal',
      `Successful Registration but couldn't send email: ${result.message}`
    );
  } else {
    await newAttendeeRef.update({ emailSent: true });
  }

  return ticket;
};
