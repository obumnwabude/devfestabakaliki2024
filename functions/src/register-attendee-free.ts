import 'dotenv/config';
import { CallableRequest, HttpsError } from 'firebase-functions/v2/https';
import { completeRegistration } from './complete-registration';
import { AttendeeInputInfo } from './schemas';
import { validateAttendee } from './validate-attendee';

export const registerAttendeeFree = async (request: CallableRequest) => {
  const { data, app } = request;

  if (!app || app?.appId != process.env.MAIN_APP_ID) {
    throw new HttpsError('failed-precondition', 'Not called from main app');
  }

  let inputInfo: AttendeeInputInfo;
  try {
    inputInfo = validateAttendee(data);
  } catch (e: any) {
    throw new HttpsError('invalid-argument', e);
  }

  const ticket = await completeRegistration(inputInfo, 'self - free');
  return { ticket, status: true, name: inputInfo.name };
};
