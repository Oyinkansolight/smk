import { Term } from '@/types/classes-and-subjects';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DashboardOverview {
  Total_TVET?: number;
  Total_Students?: number;
  Total_Staff?: number;
  Total_Grades?: number;
  Total_Schools?: number;
  Total_ECCDE?: number;
  Total_Primary?: number;
  Total_Secondary?: number;
  Total_Tertiary?: number;
  Total_Teachers?: number;
  Total_Subjects?: number;
  Total_Absent_Today: number;
  Total_Late_Today: number;
  Total_Present_Today: number;
}

export interface Label {
  id: string | number;
  value: string;
}

export interface LocalGovernmentArea {
  id?: string;
  name?: string;
  towns?: Town[];
  value?: number;
  label?: string;
}

export interface Town {
  id?: string;
  name?: string;
  value?: number;
  label?: string;
}

export interface InviteAdminParams {
  email?: string;
  role?: number;
  sendEmail: boolean;
}

export interface PaginationParams {
  id?: any;
  limit?: number;
  page?: number;
  include?: boolean;
  query?: string | number | null;
  type?: string | number | null;
}

export interface ChartParams {
  institutionType?: number;
  lgaId?: string;
  institutionId?: string;
  userType?: string;
  sessionId?: string;
  classId?: string;
  subjectId?: string;
  studentId?: string;
  staffId?: string;
  startPeriod?: string | Date;
  endPeriod?: string | Date;
}

export interface BatteryLevel {
  battryLevel?: number;
  deviceId?: string;
}

export interface EnrollmentAnalysis {
  TERTIARY: any[];
  ECCDE: any[];
  BTVET: any[];
  PRIMARY: any[];
  TVET: any[];
  SECONDARY: SecondaryEnrollment[];
}

export interface SecondaryEnrollment {
  term: Term;
  enrollmentCount: number;
}

export interface SubjectList {
  id?: any;
  order?: string;
  limit?: number;
  page?: number;
  institutionType?: string | null;
  query?: string | null;
}

export interface AllPermissionsParams {
  id?: any;
  limit?: number;
  page?: number;
  query?: string | null;
}

export interface AddRoleParams {
  type?: string;
  name?: string;
  isOverride?: boolean;
  description?: string;
  permissionIds?: string[];
}

export interface TeachersLog {
  id: string;
  clockInTime: Date;
  clockOutTime: null;
  status: boolean;
  isClockedIn: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  term: Term;
  session: Session;
}

export interface Session {
  id: string;
  session: string;
  institutionType: string;
  NumberOfWeeks: number;
  NumberOfTerms: number;
  isCurrent: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName: null;
  deviceToken: null;
  batteryLevel: number;
  phoneNumber: null;
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

export interface StaffCoordinatesParams {
  staff?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}
