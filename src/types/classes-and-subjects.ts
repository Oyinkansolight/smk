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
  id?: number;
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
  id?: number;
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
  id?: number;
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
  id?: number;
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
