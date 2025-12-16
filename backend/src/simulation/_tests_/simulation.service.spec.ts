import { SimulationService } from '../simulation.service';
import { BadRequestException } from '@nestjs/common';

describe('SimulationService – reglas académicas', () => {
  let service: SimulationService;

  // Mocks de dependencias
  const progressServiceMock = {
    getAcademicHistory: jest.fn(),
  };

  const curriculumServiceMock = {
    getCurriculum: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SimulationService(
      progressServiceMock as any,
      curriculumServiceMock as any,
    );
  });

  /**
   * TEST 1
   * Debe fallar si se intenta tomar un ramo
   * sin cumplir prerrequisitos
   */
  it('falla si falta un prerrequisito', async () => {
    progressServiceMock.getAcademicHistory.mockResolvedValue({
      approved: new Set(['MAT001']),
      failed: new Set(),
    });

    curriculumServiceMock.getCurriculum.mockResolvedValue({
      courses: new Map([
        [
          'FIS002',
          {
            code: 'FIS002',
            name: 'Física II',
            credits: 6,
            prerequisites: ['FIS001'],
          },
        ],
      ]),
      totalCourses: 1,
    });

    const dto: any = {
      studentId: 'student-1',
      careerCode: 'ING',
      maxCreditsPerSemester: 30,
      manualPlan: [
        {
          year: 2025,
          period: 'S1',
          courses: ['FIS002'],
        },
      ],
    };

    await expect(service.generateManualProjection(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  /**
   * TEST 2
   * Debe fallar si se excede el máximo
   * de créditos por semestre
   */
  it('falla si se exceden los créditos máximos', async () => {
    progressServiceMock.getAcademicHistory.mockResolvedValue({
      approved: new Set(),
      failed: new Set(),
    });

    curriculumServiceMock.getCurriculum.mockResolvedValue({
      courses: new Map([
        [
          'MAT001',
          {
            code: 'MAT001',
            name: 'Matemática',
            credits: 20,
            prerequisites: [],
          },
        ],
        [
          'FIS001',
          {
            code: 'FIS001',
            name: 'Física',
            credits: 20,
            prerequisites: [],
          },
        ],
      ]),
      totalCourses: 2,
    });

    const dto: any = {
      studentId: 'student-1',
      careerCode: 'ING',
      maxCreditsPerSemester: 30,
      manualPlan: [
        {
          year: 2025,
          period: 'S1',
          courses: ['MAT001', 'FIS001'],
        },
      ],
    };

    await expect(service.generateManualProjection(dto)).rejects.toThrow(
      BadRequestException,
    );
  });

  /**
   * TEST 3
   * Debe aceptar un plan válido
   * y aprobar correctamente el ramo
   */
  it('acepta un plan manual válido', async () => {
    progressServiceMock.getAcademicHistory.mockResolvedValue({
      approved: new Set(['MAT001']),
      failed: new Set(),
    });

    curriculumServiceMock.getCurriculum.mockResolvedValue({
      courses: new Map([
        [
          'MAT001',
          {
            code: 'MAT001',
            name: 'Matemática',
            credits: 6,
            prerequisites: [],
          },
        ],
        [
          'FIS001',
          {
            code: 'FIS001',
            name: 'Física I',
            credits: 6,
            prerequisites: ['MAT001'],
          },
        ],
      ]),
      totalCourses: 2,
    });

    const dto: any = {
      studentId: 'student-1',
      careerCode: 'ING',
      maxCreditsPerSemester: 30,
      manualPlan: [
        {
          year: 2025,
          period: 'S1',
          courses: ['FIS001'],
        },
      ],
    };

    const result = await service.generateManualProjection(dto);

    expect(result.approvedCourses).toContain('FIS001');
    expect(result.pendingCourses).toBeDefined();
    expect(result.estimatedGraduation).toBeDefined();
  });
});
