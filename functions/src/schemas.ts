export enum School {
  ebsu,
  funai
}

export enum Category {
  premium,
  luxury
}

export interface AttendeeInputInfo {
  name: string;
  email: string;
  phone: string;
  school: School | null;
  category: Category;
}

export type Payment = `admin - ${string}` | `paystack - ${string}`;

export interface AttendeeInfo extends AttendeeInputInfo {
  amount: number;
  payment: Payment;
  id: number;
  ticket: string;
}

export const getAmount = ({ category }: AttendeeInputInfo) =>
  category == Category.premium ? 3000 : 10000;
