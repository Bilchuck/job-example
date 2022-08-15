import { TechCategory } from '../candidates/fill-candidate-data/fill-candidate-data.component';

export interface AuthUser {
  email: string;
  type: UserType;
  candidate: {
    id: number;
    contactData: CandidateContactData;
    title?: string;
    salary?: number;
    stack?: TechCategory;
    summary?: string;
    experience?: string;
    skills?: string[];
    registrationStepsFinished: boolean;
  }
}
interface CandidateContactData {
  name?: string;
  phone?: string;
  email?: string;
  skype?: string;
  cv: {
    filePath?: string;
    fileName?: string;
  };
}
export enum UserType {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER',
}