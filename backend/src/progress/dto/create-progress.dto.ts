import {IsEnum,IsInt,IsNotEmpty,IsOptional,IsString,Max,Min} from 'class-validator';
import { CourseStatus, SemesterPeriod } from '../entities/progress.entity';

export class CreateProgressDto {
  @IsString()
  @IsNotEmpty()
  courseCode: string;

  @IsEnum(CourseStatus)
  status: CourseStatus;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(70)
  grade?: number;

  @IsInt()
  @Min(2000)
  @Max(2100)
  year: number;

  @IsEnum(SemesterPeriod)
  period: SemesterPeriod;
}
