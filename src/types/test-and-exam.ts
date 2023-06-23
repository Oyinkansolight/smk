export interface ClassTestExam {
  id?: number;
  title?: string;
  type?: string;
  file?: string;
  createdAt?: Date;
  updatedAt?: Date;
  session?: Session;
  class?: Class;
  term?: Term;
  subject?: Subject;
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
