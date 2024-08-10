import 'dotenv/config';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { completeRegistration } from './complete-registration';
import { AttendeeInputInfo } from './schemas';
import { validateAttendee } from './validate-attendee';

export const adminAddAttendee = async (request: CallableRequest) => {
  const { data, auth, app } = request;

  if (!app || app?.appId != process.env.ADMIN_APP_ID) {
    throw new HttpsError('failed-precondition', 'Not called from admin');
  }

  if (!auth || !auth.token.admin) {
    throw new HttpsError('permission-denied', 'Not authorized admin.');
  }

  let inputInfo: AttendeeInputInfo;
  try {
    inputInfo = validateAttendee(data);
  } catch (e: any) {
    throw new HttpsError('invalid-argument', e);
  }

  return await completeRegistration(
    inputInfo,
    `admin - ${auth.token.nickname}`
  );
};
