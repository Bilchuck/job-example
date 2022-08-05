export interface AuthUser {
  email: string;
  type: UserType;
}
export enum UserType {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER',
}