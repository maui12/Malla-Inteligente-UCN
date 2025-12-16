import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateManualSimulationDto, SemesterPlan } from './dto/create-manual-simulation.dto';
import { ProgressService } from '../progress/progress.service';
import { CurriculumService, Course, Curriculum } from '../curriculum/curriculum.service';
import { CompareScenariosDto } from './dto/compare-scenarios.dto';
import { suggestCourses } from './domain/course-recommender';


@Injectable()
export class SimulationService {
  constructor(
    private readonly progressService: ProgressService,
    private readonly curriculumService: CurriculumService,
  ) {}

  async generateManualProjection(dto: CreateManualSimulationDto) {
  const history = await this.progressService.getAcademicHistory(dto.studentId);
  const curriculum = await this.curriculumService.getCurriculum(dto.careerCode);

  // simular los cursos aprobados hasta el momento
  const simulatedApproved = new Set(history.approved);

  // soporte para escenarios (reprobaciones forzadas)
  const simulatedFailed = (dto as any).__forcedFailed ?? history.failed;

  let totalCreditsPerSemester: { semester: string; credits: number }[] = [];
  const suggestionsBySemester: {
    year: number;
    period: string;
    suggestions: string[];
  }[] = [];

  // validar el plan manual
  for (const semester of dto.manualPlan) {
    const validationResult = await this.validateSemester(
      semester,
      curriculum,
      simulatedApproved,
      simulatedFailed,
      dto.maxCreditsPerSemester,
    );

    if (!validationResult.isValid) {
      throw new BadRequestException(
        `Error en ${semester.period} ${semester.year}: ${validationResult.error}`,
      );
    }

    // aprobar cursos del semestre
    semester.courses.forEach((code) => simulatedApproved.add(code));

    totalCreditsPerSemester.push({
      semester: `${semester.period}-${semester.year}`,
      credits: validationResult.semesterCredits,
    });

    // SUGERENCIAS PARA ESTE SEMESTRE
    const suggestions = suggestCourses({
      curriculum,
      approved: simulatedApproved,
      takenThisSemester: semester.courses,
      maxCredits: dto.maxCreditsPerSemester,
    });

    suggestionsBySemester.push({
      year: semester.year,
      period: semester.period,
      suggestions,
    });
  }

  // calcular el resto de la carrera (proyección automática)
  const futurePlan = this.calculateRemainingPlan(
    curriculum,
    simulatedApproved,
    dto.maxCreditsPerSemester,
  );

  const fullPlan = [...dto.manualPlan, ...futurePlan.plan];

  const estimatedGraduation =
    fullPlan.length > 0
      ? `${fullPlan[fullPlan.length - 1].period} ${fullPlan[fullPlan.length - 1].year}`
      : 'Ya egresado';

  return {
    estimatedGraduation,
    totalCreditsPerSemester,
    fullPlan,

    approvedCourses: Array.from(simulatedApproved),
    pendingCourses: futurePlan.pending,

    suggestionsBySemester,
  };
}

  //Aplicar restricciones
  private async validateSemester(
    semester: SemesterPlan,
    curriculum: Curriculum,
    approvedSoFar: Set<string>,
    failedSoFar: Set<string>,
    maxCredits: number,
  ): Promise<{ isValid: boolean; error?: string; semesterCredits: number }> {
    
    let semesterCredits = 0;

    for (const courseCode of semester.courses) {
      const course = curriculum.courses.get(courseCode);
      if (!course) {
        return { isValid: false, error: `Ramo ${courseCode} no existe.`, semesterCredits: 0 };
      }

      
      for (const preCode of course.prerequisites) {
        if (!approvedSoFar.has(preCode)) {
          return { isValid: false, error: `Falta prerrequisito ${preCode} para ${courseCode}.`, semesterCredits: 0 };
        }
      }
      
      
      if (semester.period === 'I' || semester.period === 'V') {
        if (!failedSoFar.has(courseCode)) {
          return { isValid: false, error: `Ramo ${courseCode} solo se puede tomar en I/V si fue reprobado.`, semesterCredits: 0 };
        }
      }
      
      semesterCredits += course.credits;
    }

   
    if (semesterCredits > maxCredits) {
      return { isValid: false, error: `Excede el máximo de créditos (${semesterCredits} > ${maxCredits}).`, semesterCredits };
    }
    
    return { isValid: true, semesterCredits };
  }

 
  private calculateRemainingPlan(curriculum: Curriculum, approved: Set<string>, maxCredits: number) {
    //Implementar lógica de optimización aqui(pendiente)
    
    console.warn('calculateRemainingPlan no implementado');
    return { plan: [], pending: [] };
  }

  async compareScenarios(dto: CompareScenariosDto) {
  /**
   * Escenario A:
   * El estudiante aprueba todo normalmente
   */
  const scenarioApproveAll = await this.generateManualProjection({
    studentId: dto.studentId,
    careerCode: dto.careerCode,
    maxCreditsPerSemester: dto.maxCreditsPerSemester,
    manualPlan: [
      {
        year: dto.baseYear,
        period: dto.basePeriod,
        courses: [],
      },
    ],
  } as any);

  /**
   * Escenario B:
   * El estudiante reprueba ciertos ramos en el semestre base
   */
  const scenarioFailSome = await this.generateProjectionWithFailures(
    dto,
  );

  return {
    approveAll: {
      estimatedGraduation: scenarioApproveAll.estimatedGraduation,
    },
    failSome: {
      failedCourses: dto.failedCoursesInBaseSemester ?? [],
      estimatedGraduation: scenarioFailSome.estimatedGraduation,
    },
  };
}

private async generateProjectionWithFailures(
  dto: CompareScenariosDto,
) {
  const history = await this.progressService.getAcademicHistory(dto.studentId);

  // Clonamos el historial para no mutar el real
  const forcedFailed = new Set(history.failed);

  (dto.failedCoursesInBaseSemester ?? []).forEach((c) =>
    forcedFailed.add(c),
  );

  // Llamamos a la simulación base, pero inyectando reprobes
  return this.generateManualProjection({
    studentId: dto.studentId,
    careerCode: dto.careerCode,
    maxCreditsPerSemester: dto.maxCreditsPerSemester,
    manualPlan: [
      {
        year: dto.baseYear,
        period: dto.basePeriod,
        courses: [],
      },
    ],
    // hack controlado: forzamos failedSoFar
    __forcedFailed: forcedFailed,
  } as any);
}

async getSemesterSummary(dto: {
  studentId: string;
  careerCode: string;
  maxCreditsPerSemester: number;
  manualPlan: any[];
}) {
  // Reutilizamos la simulación existente
  const simulation = await this.generateManualProjection(dto as any);

  const curriculum = await this.curriculumService.getCurriculum(dto.careerCode);

  const summaries = simulation.fullPlan.map((semester) => {
    const credits = semester.courses.reduce((acc, code) => {
      const course = curriculum.courses.get(code);
      return acc + (course?.credits ?? 0);
    }, 0);

    return {
      year: semester.year,
      period: semester.period,
      courses: semester.courses,
      totalCredits: credits,
      pendingCourses: simulation.pendingCourses,
    };
  });

  return summaries;
}

}