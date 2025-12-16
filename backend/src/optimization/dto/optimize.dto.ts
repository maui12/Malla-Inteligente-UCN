import {IsBoolean,IsInt,IsNotEmpty,IsOptional,IsString,IsUUID,Max,Min} from 'class-validator';

export class OptimizeDto {
  @IsUUID('4', { message: 'studentId debe ser un UUID válido' })
  studentId: string;

  @IsString()
  @IsNotEmpty()
  careerCode: string;

  //mínimo de créditos por semestre
  @IsInt()
  @Min(12)
  @Max(30)
  @IsOptional()
  minCreditsPerSemester?: number;

  // Máximo de créditos por semestre (ya lo tenías)
  @IsInt()
  @Min(12)
  @Max(30)
  maxCreditsPerSemester: number;

  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  maxCoursesPerSemester?: number;

  @IsBoolean()
  useSummerWinter: boolean;
}
