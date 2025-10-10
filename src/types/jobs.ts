export interface BasePosition {
  id: number;
  title: string;
  company: string;
  location: string;
  briefDescription: string;
  keyRequirements: string[];
  applicationDeadline: string;
}

export interface Job extends BasePosition {
  salary: number;
}

export interface Internship extends BasePosition {
  stipend: number;
  duration: string;
}

export type Position = Job | Internship;
