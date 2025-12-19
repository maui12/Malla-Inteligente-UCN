// src/projection/projection.service.ts
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ExternalApiService } from '../external-api/external-api.service';
import { autoPlan } from '../simulation/domain/auto-planner';

@Injectable()
export class ProjectionService {
  private readonly logger = new Logger(ProjectionService.name);

  constructor(private readonly externalApi: ExternalApiService) {}


  async createAutomaticProjection(dto: { studentId: string; careerCode: string; maxCredits: number; catalogo?: string }) {
    try {

      const targetCatalog = dto.catalogo || '2020';

      this.logger.log(`Generando proyección para: ${dto.studentId} | Carrera: ${dto.careerCode} | Catálogo: ${targetCatalog}`);


      const [mallaRaw, avanceRaw] = await Promise.all([
        this.externalApi.fetchMalla(dto.careerCode, targetCatalog), 
        this.externalApi.fetchAvance(dto.studentId, dto.careerCode)
      ]);

      if (!mallaRaw || mallaRaw.length === 0) {

        throw new Error(`La API externa no devolvió cursos para la malla (Carrera: ${dto.careerCode}, Catálogo: ${targetCatalog}).`);
      }


      const coursesMap = new Map<string, any>();

      mallaRaw.forEach((c: any) => {
        const cleanCode = c.codigo.trim().toUpperCase();

        coursesMap.set(cleanCode, {
          code: cleanCode,
          originalCode: c.codigo,
          name: c.asignatura,
          credits: parseInt(c.creditos || 0),
          prerequisites: typeof c.prereq === 'string' 
            ? c.prereq.split(',').map((p: string) => p.trim().toUpperCase()).filter((p: string) => p !== "")
            : []
        });
      });

      const approvedSet = new Set<string>();
      if (Array.isArray(avanceRaw)) {
        avanceRaw.forEach((a: any) => {
          if (['APROBADO', 'CURSANDO', 'CONVALIDADO'].includes(a.status)) {
            approvedSet.add(a.course.trim().toUpperCase());
          }
        });
      }

      const curriculumShim = { courses: coursesMap, careerCode: dto.careerCode, totalCourses: coursesMap.size };
      
      const result = autoPlan(curriculumShim as any, approvedSet, dto.maxCredits);

      return {
        estimatedGraduation: result.plan.length > 0 
          ? `${result.plan[result.plan.length - 1].period} ${result.plan[result.plan.length - 1].year}`
          : 'N/A',
        fullPlan: result.plan.map(sem => ({
          year: sem.year,
          period: sem.period === 'S1' ? '1° Semestre' : '2° Semestre',
          totalCredits: sem.totalCredits,
          courses: sem.courses.map(cleanCode => {
            const courseData = coursesMap.get(cleanCode);
            return courseData ? courseData.originalCode : cleanCode;
          })
        })),
        totalSemesters: result.plan.length,
        pendingCourses: result.pending
      };

    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException("No se pudo generar la proyección: " + error.message);
    }
  }
}