export interface IEditClassActivity {
  id: string;
  typeOfActivity: string;
  status: string;
  latePenalty: null;
  mode: string;
  format: string;
  timeLimit: null;
  questions: null;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
  classes: Classes;
  subject: Subject;
  teacher: Teacher;
  lessonNote: null;
  questionsV2: QuestionsV2[];
}

export interface Classes {
  id: string;
  arm: string;
  capacity: number;
  curriculum: string;
  institutionType: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionsV2 {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  score: null;
  correctText: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  description: null;
  institutionType: any[];
  createdBy: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher {
  id: string;
  profileImg: null;
  firstName: string;
  lastName: string;
  middleName: null;
  deviceToken: null;
  batteryLevel: number;
  phoneNumber: null;
  email: string;
  password: string;
  address: string;
  resetPasswordToken: null;
  resetPasswordTokenExpires: null;
  type: string;
  loginCount: number;
  suspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}
