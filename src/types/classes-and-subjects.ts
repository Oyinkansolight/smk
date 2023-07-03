export interface GradeListItem {
  id?: number;
  gradeType?: string;
  gradeList?: GradeList[];
  createdAt?: Date;
  updatedAt?: Date;
  class?: Class;
  subject?: Subject;
  term?: Term;
  session?: Session;
  institution?: Institution;
}

export interface Class {
  id?: number;
  name?: string;
  startTime?: null;
  endTime?: null;
  curriculum?: string;
  institutionType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GradeList {
  percentage?: string;
  gradeListType?: string;
}

export interface Institution {
  id?: number;
  instituteName?: string;
  loginCount?: null;
  instituteEmail?: string;
  email?: string;
  instituteLogo?: string;
  instituteType?: string;
  instituteAddress?: string;
  instituteLat?: string;
  instituteLong?: string;
  isOnboardingCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session {
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

export interface Subject {
  id?: number;
  name?: string;
  description?: string;
  createdBy?: null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Term {
  id?: number;
  name?: string;
  noOfWeeks?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
