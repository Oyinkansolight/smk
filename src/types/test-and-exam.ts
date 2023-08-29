export interface ClassTestExam {
  id?: string;
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
  id?: string;
  name?: string;
  startTime?: null;
  endTime?: null;
  curriculum?: string;
  institutionType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Session {
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

export interface Subject {
  id?: string;
  name?: string;
  description?: string;
  createdBy?: null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Term {
  id?: string;
  name?: string;
  noOfWeeks?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
