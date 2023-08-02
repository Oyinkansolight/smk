import { Question, SubmittedQuestion } from '@/server/institution/lesson-note';
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
  id: string;
  gender: string;
  dob: string;
  lga: string;
  designation: string;
  staffId: string;
  'employmentDetails.jobTitle': string;
  'employmentDetails.schoolName': string;
  'employmentDetails.retirementDate': string;
  'employmentDetails.salaryGradeLevel': string;
  isTeaching: boolean;
  staffType: string;
  createdAt: Date;
  updatedAt: Date;
  'user.0.id': string;
  'user.0.firstName': string;
  'user.0.lastName': string;
  'user.0.phoneNumber': string;
  'user.0.email': string;
  'user.0.password': string;
  'user.0.address': string;
  'user.0.type': string;
  'user.0.loginCount': number;
  'user.0.suspended': boolean;
  'user.0.createdAt': Date;
  'user.0.updatedAt': Date;
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

export interface LessonNoteObject {
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
  file?: FileInterface | null;
  term?: Term;
  class?: Class;
  teacher?: Teacher;
  subject?: Subject;
  classActivities?: ClassActivity1[]
}

export interface ClassActivity1 {
  typeOfActivity: string;
  format: string;
  timeLimit: string;
  questions: Question[];
  dueDate: Date;
  teacher: Teacher;
  lessonNote: null;
  classes: Class;
  subject: Subject;
  period: Period;
  session: Session;
  term: Term;
  mode: string;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Period {
  id: string;
  title: string;
  theme: string;
  subTheme: string;
  instructionalObjective: string;
  teachingMethod: string;
  teachingTheme: string;
  teacherPreparationForLesson: string;
  instructionalMaterial: string;
  lessonProcedure: string;
  startTime: string;
  endTime: string;
  day: string;
  eventName: string;
  institutionType: string;
  teacherActivity: string;
  lessonInstructionalObjective: string;
  lessonTopic: string;
  lessonNotes: string;
  createdAt: Date;
  updatedAt: Date;
  classActivities: any[];
}

export interface SubmittedActivity {
  id: string;
  score: null;
  typeOfActivity: string;
  status: string;
  questions: SubmittedQuestion[];
  createdAt: Date;
  updatedAt: Date;
  class: Class;
  student: User;
  activity: ClassActivity1;
  period: Period;
}

export interface GradeCategory {
  id?: number;
  institutionType?: string;
  percentageScore?: number;
  categoryName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  term?: Term;
  session?: Session;
}

export interface FileInterface {
  createdAt: string;
  createdBy: string;
  fileUrl: string;
  filename: string;
  id: string;
  updatedAt: string;
  userTypes: [];
}