import { TechCategory } from './fill-candidate-data/fill-candidate-data.component'

export interface FillCandateDataDTO {
  title: string;
  salary: string;
  stack: TechCategory;
  experience: string;
  skills: string[];
  summary?: string;
  name: string;
  phone?: string;
  email?: string;
  skype?: string;
  cv: any;
}
