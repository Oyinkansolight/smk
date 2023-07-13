import {
  Class,
  Session,
  Teacher,
  Term,
  Week,
} from '@/types/classes-and-subjects';

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

export interface FlattenedStudent {
  id?: number;
  gender?: string;
  dob?: Date;
  height?: string;
  weight?: string;
  parentName?: string;
  parentOccupation?: string;
  'user.0.id'?: number;
  'user.0.firstName'?: string;
  'user.0.lastName'?: string;
  'user.0.phoneNumber'?: string;
  'user.0.email'?: string;
  'user.0.password'?: string;
  'user.0.address'?: string;
  'user.0.type'?: string;
  'user.0.suspended'?: boolean;
  'user.0.createdAt'?: Date;
  'user.0.updatedAt'?: Date;
  'institution.id'?: number;
  'institution.instituteName'?: string;
  'institution.instituteEmail'?: string;
  'institution.instituteLogo'?: string;
  'institution.instituteType'?: string;
  'institution.instituteAddress'?: string;
  'institution.instituteLat'?: string;
  'institution.instituteLong'?: string;
  'institution.isOnboardingCompleted'?: boolean;
  'institution.createdAt'?: Date;
  'institution.updatedAt'?: Date;
  'class.id'?: number;
  'class.name'?: string;
  'class.curriculum'?: string;
  'class.institutionType'?: string;
  'class.createdAt'?: Date;
  'class.updatedAt'?: Date;
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

export interface FlattenedStaff {
  id?: number;
  gender?: string;
  dob?: string;
  height?: string;
  weight?: string;
  staffType?: string;
  'institution.id'?: number;
  'institution.instituteName'?: string;
  'institution.instituteEmail'?: string;
  'institution.instituteLogo'?: string;
  'institution.instituteType'?: string;
  'institution.instituteAddress'?: string;
  'institution.instituteLat'?: string;
  'institution.instituteLong'?: string;
  'institution.isOnboardingCompleted'?: boolean;
  'institution.createdAt'?: Date;
  'institution.updatedAt'?: Date;
  'teacherEducation.0.id'?: number;
  'teacherEducation.0.schoolAttended'?: string;
  'teacherEducation.0.courseAttended'?: string;
  'teacherEducation.0.grade'?: string;
  'teacherEducation.0.educationYear'?: string;
  'teacherEducation.0.createdAt'?: Date;
  'teacherEducation.0.updatedAt'?: Date;
  'teacherEducation.1.id'?: number;
  'teacherEducation.1.schoolAttended'?: string;
  'teacherEducation.1.courseAttended'?: string;
  'teacherEducation.1.grade'?: string;
  'teacherEducation.1.educationYear'?: string;
  'teacherEducation.1.createdAt'?: Date;
  'teacherEducation.1.updatedAt'?: Date;
  'teacherEducation.2.id'?: number;
  'teacherEducation.2.schoolAttended'?: string;
  'teacherEducation.2.courseAttended'?: string;
  'teacherEducation.2.grade'?: string;
  'teacherEducation.2.educationYear'?: string;
  'teacherEducation.2.createdAt'?: Date;
  'teacherEducation.2.updatedAt'?: Date;
  'employmentHistory.0.id'?: number;
  'employmentHistory.0.employerName'?: string;
  'employmentHistory.0.role'?: string;
  'employmentHistory.0.employmentType'?: string;
  'employmentHistory.0.employmentYear'?: string;
  'employmentHistory.0.createdAt'?: Date;
  'employmentHistory.0.updatedAt'?: Date;
  'document.id'?: number;
  'document.idCardImage'?: string;
  'document.firstDocumentType'?: string;
  'document.firstUpload'?: string;
  'document.secondDocumentType'?: string;
  'document.secondUpload'?: string;
  'document.createdAt'?: Date;
  'document.updatedAt'?: Date;
  'class.0.id'?: number;
  'class.0.name'?: string;
  'class.0.curriculum'?: string;
  'class.0.institutionType'?: string;
  'class.0.createdAt'?: Date;
  'class.0.updatedAt'?: Date;
  'class.1.id'?: number;
  'class.1.name'?: string;
  'class.1.curriculum'?: string;
  'class.1.institutionType'?: string;
  'class.1.createdAt'?: Date;
  'class.1.updatedAt'?: Date;
  'subject.0.id'?: number;
  'subject.0.name'?: string;
  'subject.0.description'?: string;
  'subject.0.createdAt'?: Date;
  'subject.0.updatedAt'?: Date;
  'subject.1.id'?: number;
  'subject.1.name'?: string;
  'subject.1.description'?: string;
  'subject.1.createdAt'?: Date;
  'subject.1.updatedAt'?: Date;
  'user.0.id'?: number;
  'user.0.firstName'?: string;
  'user.0.lastName'?: string;
  'user.0.email'?: string;
  'user.0.password'?: string;
  'user.0.address'?: string;
  'user.0.type'?: string;
  'user.0.suspended'?: boolean;
  'user.0.createdAt'?: Date;
  'user.0.updatedAt'?: Date;
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

export interface Institution {
  id?: number;
  instituteName?: string;
  instituteEmail?: string;
  instituteLogo?: string;
  instituteType?: string;
  instituteAddress?: string;
  instituteLat?: string;
  instituteLong?: string;
  isOnboardingCompleted?: boolean;
  students?: Student[];
  staff?: Staff[];
  studentCount?: number;
  staffCount?: number;
}

export interface AcademicCalendarType {
  id: number;
  title: string;
  institutionType: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
    deviceToken: string | null;
    phoneNumber: string | null;
    email: string;
    address: string;
    type: string;
    suspended: boolean;
    createdAt: string;
    updatedAt: string;
  };
  session: {
    id: number;
    session: string;
    institutionType: string;
    NumberOfWeeks: number;
    NumberOfTerms: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ClassActivity {
  id?: number;
  title?: string;
  theme?: string;
  subTheme?: string;
  instructionalObjective?: string;
  teachingMethod?: string;
  teachingTheme?: string;
  teacherPreparationForLesson?: string;
  instructionalMaterial?: string;
  lessonProcedure?: string;
  startTime?: string;
  endTime?: string;
  day?: string;
  eventName?: string;
  institutionType?: string;
  teacherActivity?: string;
  lessonInstructionalObjective?: string;
  lessonTopic?: string;
  lessonNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  week?: Week;
  session?: Session;
  file?: null;
  term?: Term;
  class?: Class;
  teacher?: Teacher;
  subject?: Subject;
}
