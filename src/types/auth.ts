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

export interface Parent {
  id: string;
  profileImg: string;
  firstName: string;
  email: string;
  lastName: string;
  lga: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  students: Student[];
}

export interface Student {
  id: string;
  profileImg: null | string;
  firstName: string;
  lastName: string;
  email: string;
  lga: null | string;
  readingProficiency: string;
  address: string;
  gender: string;
  dob: string;
  studentId: string;
  instituteLat: null;
  instituteLong: null;
  createdAt: Date;
  updatedAt: Date;
  lessonNoteTimeLogs: any[];
  classArmId: string;
}

export interface UserInfo {
  id?: string;
  firstName?: string;
  lastName?: string;
  deviceToken?: null;
  batteryLevel?: null;
  phoneNumber?: null;
  gender: string;
  profileImg: null | string;
  email?: string;
  signature?: string;
  address?: string;
  lga?: string;
  middleName?: string;
  resetPasswordToken?: null;
  resetPasswordTokenExpires?: null;
  type?: string;
  parent?: Parent;
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
    principal: Principal;
  };
  staff?: Staff;
  student?: null;
  role?: Role[];
}

export interface Principal {
  id: string;
  profileImg: any;
  firstName: string;
  lastName: string;
  middleName: string;
  deviceToken: any;
  batteryLevel: any;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  resetPasswordToken: any;
  resetPasswordTokenExpires: any;
  type: string;
  loginCount: number;
  suspended: boolean;
  signature: any;
  createdAt: string;
  updatedAt: string;
  staff: Staff;
}

export interface EmploymentDetails {
  jobTitle: string;
  schoolName: string;
  retirementDate: string;
  salaryGradeLevel: string;
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
