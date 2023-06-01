/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Subject {
  id?: number;
  name?: string;
  description?: string;
  classes?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student {
  id?: number;
  gender?: string;
  dob?: Date;
  height?: string;
  weight?: string;
  parentName?: string;
  parentOccupation?: string;
  user?: User[];
  institution?: Institution;
  class?: any;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  type: string;
  suspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  id?: number;
  gender?: string;
  dob?: string;
  height?: string;
  weight?: string;
  staffType?: string;
  institution?: Institution;
  teacherEducation?: TeacherEducation[];
  employmentHistory?: EmploymentHistory[];
  document?: Document;
  class?: any[];
  subject?: any[];
  user?: User[];
}

export interface Document {
  id: number;
  idCardImage: string;
  firstDocumentType: string;
  firstUpload: string;
  secondDocumentType: string;
  secondUpload: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmploymentHistory {
  id: number;
  employerName: string;
  role: string;
  employmentType: string;
  employmentYear: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeacherEducation {
  id: number;
  schoolAttended: string;
  courseAttended: string;
  grade: string;
  educationYear: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  address: string;
  type: string;
  suspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncidentReportType {
  title: string;
  description: string;
  issues: string[];
  priorityLevel: string;
  reportAttachment?: string;
  institutionId: number;
}

export interface InstituteClass {
  id: number;
  name: string;
  startTime: null;
  endTime: null;
  curriculum: string;
  institutionType: string;
  createdAt: Date;
  updatedAt: Date;
  staff: null;
  subjects: any[];
}

interface Institution {
  id?: number;
  instituteName?: string;
  instituteEmail?: string;
  instituteLogo?: null;
  instituteType?: string;
  instituteAddress?: null;
  instituteLat?: null;
  instituteLong?: null;
  isOnboardingCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}



