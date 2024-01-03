export interface IParentDashboard {
  parent: Parent;
  student: Student;
  todayPeriods: any[];
  assignments: any[];
  subjects: any;
  attendanceRate: null;
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
  email: null | string;
  lga: null | string;
  readingProficiency: string;
  address: null | string;
  gender: string;
  dob: string;
  studentId: null | string;
  instituteLat: null;
  instituteLong: null;
  createdAt: Date;
  updatedAt: Date;
  user: User[];
  class: ClassElement | null;
  lessonNoteTimeLogs: any[];
  classArmId: null | string;
  institution?: Institution;
}

export interface ArmClassClass {
  id: string;
  name: string;
  startTime: null;
  endTime: null;
  curriculum: Curriculum;
  institutionType: string;
  createdAt: Date;
  updatedAt: Date;
  arms: ClassElement[];
}

export interface ClassElement {
  id: string;
  arm: Arm;
  capacity: number;
  curriculum: Curriculum;
  institutionType: null;
  createdAt: Date;
  updatedAt: Date;
  class?: ArmClassClass;
}

export enum Curriculum {
  Default = 'DEFAULT',
}

export enum Arm {
  A = 'A',
  Artisan = 'ARTISAN',
  B = 'B',
  Sss = 'SSS',
  Star = 'STAR',
}

export interface Institution {
  id: string;
  instituteName: string;
  instituteEmail: string;
  email: string;
  phone: null;
  instituteLogo: string;
  zone: null;
  instituteType: string;
  instituteAddress: string;
  instituteLat: string;
  instituteLong: string;
  clockInDistance: null;
  isOnboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: null;
  deviceToken: null;
  batteryLevel: null;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  resetPasswordToken: null;
  resetPasswordTokenExpires: null;
  type: string;
  loginCount: number;
  suspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// export interface Subjects {
// }
