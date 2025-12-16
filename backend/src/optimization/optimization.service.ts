import { Injectable } from '@nestjs/common';
import { OptimizeDto } from './dto/optimize.dto';
import { ProgressService, AcademicHistory } from '../progress/progress.service';
import { CurriculumService, Curriculum, Course } from '../curriculum/curriculum.service';

//Estructura de la proyección
type SemesterPlan = {
  year: number;
  period: 'S1' | 'S2' | 'I' | 'V';
  courses: Course[];
  totalCredits: number;
};
type Projection = SemesterPlan[];

@Injectable()
export class OptimizationService {

  constructor(
    private readonly progressService: ProgressService,
    private readonly curriculumService: CurriculumService,
  ) {}

  //Implementar algoritmo básico de optimizacion
  async generateFastestPath(dto: OptimizeDto) {
    const history = await this.progressService.getAcademicHistory(dto.studentId);
    const curriculum = await this.curriculumService.getCurriculum(dto.careerCode);
    
    const projection: Projection = [];
    const simApproved = new Set(history.approved);
    const totalCourses = curriculum.totalCourses;
    
    //Definir año y periodo inicial
    let currentYear = 2025;
    let currentPeriod: 'S1' | 'S2' = 'S2';


    //Prueba de algoritmo semestre a semestre(no tomar en cuenta aun no lo investigo completamente)

    // --- INICIO DEL ALGORITMO (Greedy / Topological Sort) ---
    //
    // TODO: Implementar la lógica de simulación semestre a semestre.
    //
    // while (simApproved.size < totalCourses) {
    //   1. Determinar el siguiente semestre (ej. S2 -> S1, año++)
    //   
    //   2. Encontrar ramos "tomables" (getTakeableCourses):
    //      - Iterar todos los ramos de 'curriculum.courses'
    //      - Un ramo es "tomable" si:
    //          a) NO está en 'simApproved'
    //          b) TODOS sus prerrequisitos SÍ están en 'simApproved'
    //
    //   3. Llenar el semestre (fillSemester):
    //      - Crear un 'currentSemesterPlan'
    //      - Iterar 'takeableCourses'
    //      - Prioridad: ¿Ramos que abren más puertas? ¿O simplemente los primeros?
    //      - Añadir ramo al 'currentSemesterPlan' SI:
    //          a) No se supera 'maxCoursesPerSemester'
    //          b) No se supera 'maxCreditsPerSemester'
    //
    //   4. Actualizar estado:
    //      - Añadir ramos de 'currentSemesterPlan' a 'simApproved'
    //      - Añadir 'currentSemesterPlan' a 'projection'
    //
    //   5. Manejar I/V (si 'dto.useSummerWinter' es true):
    //      - Después de S1 o S2, verificar si hay ramos en 'history.failed'
    //      - Intentar añadirlos en un semestre 'I' o 'V' si se puede
    // }
    //
    // --- FIN DEL ALGORITMO ---

    
    console.warn('Algoritmo de optimización NO implementado');
    if (simApproved.size < totalCourses) {
       projection.push({
         year: currentYear,
         period: currentPeriod,
         courses: [/* Ramos calculados */],
         totalCredits: 0
       });
    }

    const estimatedGraduation = projection.length > 0 ? 
      `${projection[projection.length - 1].period} ${projection[projection.length - 1].year}` :
      'Ya egresado';

    return {
      estimatedGraduation,
      projection,
    };
  }
}