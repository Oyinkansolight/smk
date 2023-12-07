import { UserInfo } from '@/types/auth';

export interface GradeListItem {
  id?: string;
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

export interface ClassInterface {
  id?: string;
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
  id?: string;
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
  session?: Session;
}

export interface TeacherNextClass {
  id?: string;
  title?: string;
  theme?: null;
  subTheme?: null;
  instructionalObjective?: null;
  teachingMethod?: null;
  teachingTheme?: null;
  teacherPreparationForLesson?: null;
  instructionalMaterial?: null;
  lessonProcedure?: null;
  startTime?: string;
  endTime?: string;
  day?: string;
  eventName?: null;
  institutionType?: string;
  teacherActivity?: null;
  lessonInstructionalObjective?: null;
  lessonTopic?: null;
  lessonNotes?: null;
  createdAt?: Date;
  updatedAt?: Date;
  session?: Session;
  term?: Term;
  subject?: Subject;
  class?: Class;
  week?: Week;
  teacher?: Teacher;
  file?: null;
}

export interface Class {
  id?: string;
  arm?: string;
  name?: string;
  startTime?: null;
  endTime?: null;
  curriculum?: string;
  institutionType?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Teacher {
  id?: string;
  gender?: string;
  dob?: string;
  lga?: string;
  profileImg?: string;
  nextOfKin?: string;
  relationshipToNextOfKin?: string;
  addressOfNextOfKin?: string;
  phoneOfNextOfKin?: string;
  trainingDetails?: TrainingDetail[];
  employmentDetails?: EmploymentDetails;
  isTeaching?: boolean;
  staffType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user: UserInfo;
}

export interface EmploymentDetails {
  staffId?: string;
  jobTitle?: string;
  datePosted?: string;
  schoolName?: string;
  retirementDate?: string;
  salaryGradeLevel?: string;
  highestQualification?: string;
  DateOfFirstAppointment?: string;
}

export interface TrainingDetail {
  year?: string;
  titleOfTraining?: string;
}

export interface Week {
  id?: string;
  name?: string;
  theme?: string;
  topic?: string;
  description?: string;
  noOfPeriod?: string;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClassArm {
  id?: string;
  arm?: string;
  capacity?: number;
  curriculum?: string;
  institutionType?: null;
  createdAt?: Date;
  updatedAt?: Date;
  class?: Class;
  teacher?: Teacher;
  session?: Session;
  institution?: Institution;
}

export interface StudentResult {
  agregates: Agregates;
  subjectResults: SubjectResults;
  domains: any[];
}

export interface Agregates {
  studentPositionInClass: string;
  totalStudents: number;
  studentTotalExamScore: number;
  classTotalExamScore: number;
  studentAverageExamScore: number;
}

export interface SubjectResults {
  subjectsGrades: SubjectsGrade[];
  overallTotalScore: number;
  classPosition: string;
  studentId: string;
}

export interface SubjectsGrade {
  id: string;
  ca1_score: number;
  ca2_score: number;
  exams_score: number;
  total: number;
  grade: null | string;
  remark: null | string;
  position: null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  subject: Subject;
  classArm: ClassArm;
  student: Student;
  institution: Institution;
  staff: null;
  session: Session;
  term: Term;
}

export interface Student {
  id: string;
  profileImg: null;
  firstName: string;
  lastName: string;
  email: null;
  lga: string;
  readingProficiency: string;
  address: string;
  gender: string;
  dob: string;
  studentId: string;
  instituteLat: null;
  instituteLong: null;
  createdAt: Date;
  updatedAt: Date;
  lessonNoteTimeLogs: any[];
  classArmId: string;
}
