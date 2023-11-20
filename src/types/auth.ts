import { Staff } from '@/types/institute';

export interface UserProfile {
  currentTerm?: {
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
    id?: string;
    name?: string;
    noOfWeeks?: string;
  };
  currentWeek?: {
    startDate?: Date;
    endDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    description?: string;
    id?: string;
    name?: number;
    noOfPeriod?: string;
    topic?: string;
    theme?: string;
  };
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
  role?: Role[];
}

export interface Role {
  id?: string;
  name?: string;
  isoverride?: boolean;
  permissions?: Permissions[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Permissions {
  id: string;
  action: string;
  target: string;
  negate: boolean;
  createdAt: string;
  updatedAt: string;
}
