import { Staff } from '@/types/institute';

export interface UserProfile {
  userInfo?: UserInfo;
  currentSession?: CurrentSession[];
}

export interface CurrentSession {
  id?: string;
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
  id?: string;
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
  esgAdmin?: unknown;
  esiAdmin?: {
    createdAt: string;
    email: string;
    id: string;
    instituteAddress: string;
    instituteEmail: string;
    instituteLat: string;
    instituteLogo: string;
    instituteLong: string;
    instituteName: string;
    instituteType: string;
    isOnboardingCompleted: boolean;
    updatedAt: string;
  };
  staff?: Staff;
  student?: null;
}
