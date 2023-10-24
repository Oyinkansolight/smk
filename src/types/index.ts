/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DashboardOverview {
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
}

export interface PaginationParams {
  id?: any;
  limit?: number;
  page?: number;
  query?: string;
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
  startPeriod?: string;
  endPeriod?: string;
}

export interface BatteryLevel {
  battryLevel?: number;
  deviceId?: string;
}
