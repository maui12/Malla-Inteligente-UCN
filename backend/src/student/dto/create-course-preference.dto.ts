import { IsString, IsInt, IsEnum } from 'class-validator';
import { SemesterPeriod } from '../../progress/entities/progress.entity';

export class CreateCoursePreferenceDto {
  @IsString()
  studentId: string;

  @IsString()
  courseCode: string;

  @IsInt()
  year: number;

  @IsEnum(SemesterPeriod)
  period: SemesterPeriod;
}
