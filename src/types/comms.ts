export interface messages {
  id: string;
  messageTitle: string;
  read: boolean;
  messageBody: string;
  files: null;
  createdAt: Date;
  updatedAt: Date;
  recepients: any[];
  sender: Sender;
  replies: any[];
}

export interface Sender {
  id: string;
  firstName: string;
  lastName: string;
  middleName: null;
  deviceToken: null;
  batteryLevel: null;
  phoneNumber: string;
  email: string;
  password: string;
  address: null;
  resetPasswordToken: null;
  resetPasswordTokenExpires: null;
  type: string;
  loginCount: number;
  suspended: boolean;
  createdAt: Date;
  updatedAt: Date;
}
