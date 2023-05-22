/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Subject {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student {
  id: number;
  gender: string;
  dob: Date;
  height: string;
  weight: string;
  parentName: string;
  parentOccupation: string;
  user: User[];
  institution: any;
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
  id: number;
  gender: string;
  dob: Date;
  height: string;
  weight: string;
  staffType: string;
  teacherEducation: TeacherEducation[];
  employmentHistory: EmploymentHistory[];
  document: Document;
  class: any[];
  subject: any[];
  user: User[];
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
  employmentYear: Date;
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
