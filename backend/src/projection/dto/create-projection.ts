import { IsInt, IsNotEmpty, IsString, IsOptional, Max, Min } from 'class-validator';

export class CreateProjectionDto {
  @IsString()
  @IsNotEmpty()
  studentId: string; // El rUT

  @IsString()
  @IsNotEmpty()
  careerCode: string;

  @IsString()
  @IsOptional()
  catalogo?: string;

  @IsInt()
  @Min(12)
  @Max(35)
  maxCredits: number;
}