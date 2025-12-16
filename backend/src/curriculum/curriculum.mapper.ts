import { CurriculumCourse } from './types/curriculum-course.type';
import { Curriculum, Course } from './curriculum.service';

export function buildCurriculum(
  careerCode: string,
  rawCourses: CurriculumCourse[],
): Curriculum {
  const coursesMap = new Map<string, Course>();

  for (const c of rawCourses) {
    coursesMap.set(c.code, {
      code: c.code,
      name: c.name,
      credits: c.credits,
      prerequisites: c.prerequisites ?? [],
    });
  }

  return {
    careerCode,
    courses: coursesMap,
    totalCourses: coursesMap.size,
  };
}
