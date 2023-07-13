import { Staff } from '@/types/institute';

export interface UserProfile {
  userInfo?: UserInfo;
  currentSession?: CurrentSession;
}

export interface CurrentSession {
  id?: number;
  session?: string;
  institutionType?: string;
  NumberOfWeeks?: number;
  NumberOfTerms?: number;
  isCurrent?: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInfo {
  id?: number;
  firstName?: string;
  lastName?: string;
  deviceToken?: null;
  batteryLevel?: null;
  phoneNumber?: null;
  email?: string;
  address?: string;
  resetPasswordToken?: null;
  resetPasswordTokenExpires?: null;
  type?: string;
  loginCount?: number;
  suspended?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  esgAdmin?: null;
  esiAdmin?: null;
  staff?: Staff;
  student?: null;
}
