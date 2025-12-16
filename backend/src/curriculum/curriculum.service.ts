import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ExternalApiService } from '../external-api/external-api.service';
import { CurriculumCourse } from './types/curriculum-course.type';
import { buildCurriculum } from './curriculum.mapper';

export interface Course {
  code: string;
  name: string;
  credits: number;
  prerequisites: string[];
}

export interface Curriculum {
  careerCode: string;
  courses: Map<string, Course>;
  totalCourses: number;
}

@Injectable()
export class CurriculumService {
  async getCourseDetails(courseCode: string) {
  for (const curriculum of this.curriculumCache.values()) {
    const course = curriculum.courses.get(courseCode);
    if (course) return course;
  }
  return undefined;
}


  private curriculumCache = new Map<string, Curriculum>();

  constructor(private readonly externalApiService: ExternalApiService) {}

  async getCurriculum(careerCode: string): Promise<Curriculum> {
    if (this.curriculumCache.has(careerCode)) {
      return this.curriculumCache.get(careerCode)!;
    }

    try {
      const apiCourses = await this.externalApiService.fetchCurriculumFromAPI(careerCode);

      if (!Array.isArray(apiCourses)) {
        throw new InternalServerErrorException('Formato inválido de malla curricular');
      }

      const normalized: CurriculumCourse[] = apiCourses.map((c: any) => ({
        code: c.code,
        name: c.name,
        credits: c.credits,
        prerequisites: c.prerequisites ?? [],
        recommendedSemester: c.recommendedSemester,
        period: c.period,
      }));

      const curriculum = buildCurriculum(careerCode, normalized);
      this.curriculumCache.set(careerCode, curriculum);

      return curriculum;
    } catch (err) {
      console.error('[CurriculumService]', err);
      throw new InternalServerErrorException('Error procesando la malla curricular');
    }
  }
}
