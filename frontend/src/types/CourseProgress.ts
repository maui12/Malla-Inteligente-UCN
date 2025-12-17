export type CourseStatus = 'approved' | 'failed';
export type SemesterPeriod = 'S1' | 'S2' | 'I' | 'V';

export interface CourseProgress {
  id: string;
  studentId: string;
  courseCode: string;
  status: CourseStatus;
  year: number;
  period: SemesterPeriod;
}