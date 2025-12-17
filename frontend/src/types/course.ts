export type SemesterPeriod = 'S1' | 'S2' | 'I' | 'V';

export interface Course {
  code: string;
  name: string;
  credits: number;
  prerequisites: string[];
  recommendedSemester?: number;
  period?: SemesterPeriod;
}