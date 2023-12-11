import { Question, SubmittedQuestion } from '@/server/institution/lesson-note';
import { Session, Teacher, Term, Week } from '@/types/classes-and-subjects';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AssignedSubject {
  id: string;
  createdAt: string;
  updatedAt: string;
  student: any;
  class: ClassInterface;
  session: Session;
  subject: Subject;
}
export interface classType {
  arm: string;
  capacity: number;
  createdAt: string;
  curriculum: string;
  id: string;
  institutionType: null;
  updatedAt: string;
}

export interface Subject {
  id?: string;
  name?: string;
  description?: string;
  classes?: any[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student {
  id?: string;
  gender?: string;
  dob?: Date;
  firstName?: string;
  lastName?: string;
  height?: string;
  weight?: string;
  profileImg?: string;
  parentName?: string;
  readingProficiency?: string;
  parentOccupation?: string;
  user?: User[] | User;
  institution?: Institution;
  class?: any;
  studentId?: string;
  teacher?: string;
  createdAt?: string;
}

export interface FlattenedStudent {
  id?: string;
  gender?: string;
  dob?: Date;
  height?: string;
  weight?: string;
  parentName?: string;
  profileImg?: string;
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
  id?: string;
  class?: any[];
  user?: User;
  lga?: string;
  dob?: string;
  email?: string;
  subject?: any[];
  gender?: string;
  height?: string;
  weight?: string;
  address?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  nextOfKin?: string;
  staffType?: string;
  document?: Document;
  phoneNumber?: string;
  institution?: Institution;
  phoneOfNextOfKin?: string;
  addressOfNextOfKin?: string;
  oracleNumber?: string | number;
  relationshipToNextOfKin?: string;
  trainingDetails: TrainingDetails[];
  employmentDetails: EmploymentDetails;
  teacherEducation?: TeacherEducation[];
  employmentHistory?: EmploymentHistory[];
  managedClassArm?: ManagedClassArm | null;
}

export interface TrainingDetails {
  titleOfTraining: string;
  year: string;
}

export interface ManagedClassArm {
  id: string;
  arm: string;
  capacity: number;
  curriculum: string;
  institutionType?: string | null;
  createdAt: string;
  updatedAt: string;
  class: ClassInterface;
}

export interface ClassInterface {
  id: string;
  name: string;
  startTime: any;
  endTime: any;
  curriculum: string;
  institutionType: string;
  createdAt: string;
  updatedAt: string;
  class: {
    arms: Arm[];
    createdAt: string;
    curriculum: string;
    endTime: null;
    id: string;
    institutionType: string;
    name: string;
    startTime: null;
    updatedAt: string;
  };
  arm: string;
}

export interface Arm {
  id: string;
  arm: string;
  capacity: number;
  curriculum: string;
  institutionType: any;
  createdAt: string;
  updatedAt: string;
}

export interface FlattenedStaff {
  id: string;
  gender: string;
  dob: string;
  lga: string;
  designation: string;
  staffId: string;
  oracleNumber: string | number;
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

export interface EmploymentDetails {
  jobTitle?: string;
  datePosted?: string;
  schoolName?: string;
  retirementDate?: string;
  salaryGradeLevel?: string;
  highestQualification?: string;
  DateOfFirstAppointment?: string;
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
  deviceToken: any;
  batteryLevel: any;
  resetPasswordToken: any;
  resetPasswordTokenExpires: any;
  loginCount: number;
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
  id?: string;
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
  classes?: classType[];
  studentCount?: number;
  staffCount?: number;
  totalClassArm?: number | string;
  totalStaff?: number | string;
  totalStudent?: number | string;
  totalSubjects?: number | string;
  createdAt?: string;
  email?: string;
  lga?: null;
  phone?: string;
  updatedAt?: string;
  user?: User;
  zone?: string;
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
  id?: string;
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
  class?: ClassInterface;
  teacher?: Teacher;
  subject?: Subject;
  classActivities?: ClassActivity1[];
}

export interface LessonNote1 {
  id: string;
  title: string;
  uploadUrl: string;
  instructionalTeachingActivity: null;
  createdAt: Date;
  updatedAt: Date;
  class: ClassInterface;
  subject: Subject;
  session: Session;
  term: Term;
  week: Week;
  period: Period;
}

export interface ClassActivity1 {
  typeOfActivity: string;
  format: string;
  timeLimit: string;
  questions: Question[];
  questionsV2: Question[];
  dueDate: Date;
  teacher: Teacher;
  lessonNote: null;
  classes: ClassInterface;
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
  questionsV2: SubmittedQuestion[];
  createdAt: Date;
  updatedAt: Date;
  class: ClassInterface;
  student: User;
  activity: ClassActivity1;
  period: Period;
}

export interface GradeCategory {
  id?: string;
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
  fileType?: string;
}

//* Class Arm Attendance Interface starts here
export interface StudentAttendanceInterface {
  id: string;
  profileImg: string;
  firstName: string;
  lastName: string;
  parentDetails: ParentDetails;
  lga: string;
  address: any;
  parentStatus: string;
  gender: string;
  dob: string;
  studentId: string;
  parentOccupation: string;
  createdAt: string;
  updatedAt: string;
  attendanceToday?: AttendanceToday;
}

export interface ParentDetails {
  lga: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export interface AttendanceToday {
  createdAt: string;
  day: string;
  id: string;
  status: 'ABSENT' | 'PRESENT' | 'LATE' | undefined;
  updatedAt: string;
}
//* Class Arm Attendance Interface ends here

export interface GradeRubricInterface {
  id: string;
  institutionType: string;
  label: string;
  remark: string;
  minRange: number;
  maxRange: number;
  createdAt: string;
  updatedAt: string;
  term: Term;
  session: Session;
}

export interface ClassArmStudents {
  id: string;
  profileImg: string;
  firstName: string;
  lastName: string;
  parentDetails: ParentDetails;
  lga: string;
  address: any;
  parentStatus: string;
  gender: string;
  dob: string;
  studentId: string;
  parentOccupation: string;
  createdAt: string;
  updatedAt: string;
  class: ClassInterface;
  institution: Institution;
  user: User;
  classArmId: string;
  grade?: any;
}

export interface StudentsListByInstitution {
  page?: number;
  limit?: number;
  query?: string;
  instituteId: string;
}

export interface AssignStudentToParent {
  id: string;
  studentId: string;
}

// instituteId?: string,
//   currentSessionId?: string,
//   enabled?: boolean

export interface InstituteClassArmsParams {
  page?: number;
  limit?: number;
  query?: string;
  enabled?: boolean;
  instituteId?: string;
  currentSessionId?: string;
}

export interface Parent {
  id?: string;
  profileImg?: string;
  firstName?: string;
  email?: string;
  lastName?: string;
  lga?: string;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
  students?: Student[];
}
