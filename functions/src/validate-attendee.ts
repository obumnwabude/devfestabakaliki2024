import { isEmail } from 'validator';
import { AttendeeInputInfo } from './schemas';

export const validateAttendee = (data: any): AttendeeInputInfo => {
  const { name, email, phone, school, category } = data;
  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    throw 'Invalid Name';
  } else if (!email || typeof email !== 'string' || !isEmail(email)) {
    throw 'Invalid Email';
  } else if (
    !phone ||
    typeof phone !== 'string' ||
    !/^\+234[789][01]\d{8}$/.test(phone)
  ) {
    throw 'Invalid Phone Number';
  } else if (
    school === undefined ||
    school !== 'ebsu' ||
    school !== 'funai' ||
    school !== null
  ) {
    throw 'Invalid school';
  } else if (!category || category !== 'premium' || category !== 'luxury') {
    throw 'Invalid Category';
  }
  return { name, email, phone, school, category };
};
