import { SemesterPeriod } from '../../progress/entities/progress.entity';

export class SemesterSummaryDto {
  year: number;
  period: SemesterPeriod;

  courses: string[];
  totalCredits: number;

  pendingCourses: string[];
}
