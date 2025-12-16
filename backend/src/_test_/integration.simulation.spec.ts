import { Test, TestingModule } from '@nestjs/testing';
import { SimulationService } from '../simulation/simulation.service';
import { ProgressService } from '../progress/progress.service';
import { CurriculumService } from '../curriculum/curriculum.service';
import { BadRequestException } from '@nestjs/common';
import { CourseStatus } from '../progress/entities/progress.entity';
import { SemesterPeriod } from '../progress/entities/progress.entity';


describe('Integración – progreso + simulación', () => {
  let simulationService: SimulationService;
  let progressService: ProgressService;

  const progressRepoMock = {
    find: jest.fn(),
  };

  const curriculumServiceMock = {
    getCurriculum: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulationService,
        ProgressService,
        {
          provide: CurriculumService,
          useValue: curriculumServiceMock,
        },
        {
          provide: 'ProgressRepository',
          useValue: progressRepoMock,
        },
      ],
    }).compile();

    progressService = module.get(ProgressService);
    simulationService = new SimulationService(
      progressService,
      curriculumServiceMock as any,
    );
  });

  it('flujo completo: progreso → simulación válida', async () => {
    progressRepoMock.find.mockResolvedValue([
      { courseCode: 'MAT001', status: CourseStatus.APPROVED },
    ]);

    curriculumServiceMock.getCurriculum.mockResolvedValue({
      courses: new Map([
        [
          'MAT001',
          { code: 'MAT001', credits: 6, prerequisites: [] },
        ],
        [
          'FIS001',
          { code: 'FIS001', credits: 6, prerequisites: ['MAT001'] },
        ],
      ]),
      totalCourses: 2,
    });

    const result = await simulationService.generateManualProjection({
      studentId: 'student-1',
      careerCode: 'ING',
      maxCreditsPerSemester: 30,
      manualPlan: [
        {
          year: 2025,
          period: SemesterPeriod.S1,
          courses: ['FIS001'],
        },
      ],
    });

    expect(result.approvedCourses).toContain('FIS001');
    expect(result.pendingCourses.length).toBeGreaterThanOrEqual(0);
  });
});
