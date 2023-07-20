import { UserInfo } from '@/types/auth';
import { Subject } from '@/types/institute';

export default interface NewMaterial {
  title: string;
  description: string;
  documentPath: string;
  pages: string[];
}

export interface UserFile {
  id?: string;
  fileUrl?: string;
  filename?: string;
  userTypes?: string[];
  createdBy?: UserInfo;
  size?: string;
  createdAt?: Date;
  updatedAt?: Date;
  folder?: UserFolder;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subject?: Subject[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  institutions?: any[];
}

export interface UserFolder {
  id?: number;
  folderName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: UserInfo;
  size?: string;
}
