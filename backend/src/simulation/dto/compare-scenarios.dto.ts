import { IsString, IsInt, IsArray, IsOptional, IsEnum } from 'class-validator';
import { SemesterPeriod } from '../../progress/entities/progress.entity';

export class CompareScenariosDto {
  @IsString()
  studentId: string;

  @IsString()
  careerCode: string;

  @IsInt()
  maxCreditsPerSemester: number;

  @IsInt()
  baseYear: number;

  @IsEnum(SemesterPeriod)
  basePeriod: SemesterPeriod;

  @IsOptional()
  @IsArray()
  failedCoursesInBaseSemester?: string[];
}
