import { ProgressService } from '../progress.service';
import { CourseStatus } from '../entities/progress.entity';

describe('ProgressService – métodos públicos', () => {
  let service: ProgressService;

  const progressRepoMock = {
    find: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProgressService(progressRepoMock as any, {} as any);
  });

  /**
   * TEST A.2.1
   * getAcademicHistory construye correctamente
   * el historial académico del estudiante
   */
  it('getAcademicHistory devuelve approved y failed correctamente', async () => {
    progressRepoMock.find.mockResolvedValue([
      { courseCode: 'MAT001', status: CourseStatus.APPROVED },
      { courseCode: 'FIS001', status: CourseStatus.FAILED },
      { courseCode: 'PRG001', status: CourseStatus.APPROVED },
    ]);

    const history = await service.getAcademicHistory('student-1');

    expect(history.approved.has('MAT001')).toBe(true);
    expect(history.approved.has('PRG001')).toBe(true);
    expect(history.failed.has('FIS001')).toBe(true);
    expect(history.failed.has('MAT001')).toBe(false);
  });

  it('getPendingCourses devuelve los ramos pendientes según la malla', async () => {
  progressRepoMock.find.mockResolvedValue([
    { courseCode: 'MAT001', status: CourseStatus.APPROVED },
  ]);

  const curriculumServiceMock = {
    getCurriculum: jest.fn().mockResolvedValue({
      courses: new Map([
        ['MAT001', {}],
        ['FIS001', {}],
        ['PRG001', {}],
      ]),
    }),
  };

  service = new ProgressService(
    progressRepoMock as any,
    curriculumServiceMock as any,
  );

  const pending = await service.getPendingCourses('student-1', 'ING');

  expect(pending).toEqual(expect.arrayContaining(['FIS001', 'PRG001']));
  expect(pending).not.toContain('MAT001');
});

});
