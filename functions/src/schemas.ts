export enum School {
  ebsu = 'ebsu',
  aefunai = 'aefunai',
  none = 'none'
}

export enum Category {
  premium = 'premium',
  luxury = 'luxury'
}

export interface AttendeeInputInfo {
  name: string;
  email: string;
  phone: string;
  school: School;
  category: Category;
}

export type Payment =
  | `admin - ${string}`
  | `paystack - ${string}`
  | 'self - free';

export interface AttendeeInfo extends AttendeeInputInfo {
  amount: number;
  payment: Payment;
  id: number;
  ticket: string;
}

export const getAmount = ({ category }: AttendeeInputInfo) =>
  category === Category.premium ? 0 : 5000;

export interface CheckReferenceResult {
  status: boolean;
  ticket?: string | undefined;
}
