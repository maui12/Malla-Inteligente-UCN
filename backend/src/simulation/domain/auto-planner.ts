import { Curriculum } from '../../curriculum/curriculum.service';

export function autoPlan(
  curriculum: Curriculum,
  approved: Set<string>,
  maxCredits: number,
) {
  const plan: Array<{ year: number; period: 'S1' | 'S2'; courses: string[]; totalCredits: number }> = [];
  const pending = new Set(curriculum.courses.keys());
  approved.forEach(c => pending.delete(c));

  let year = 2025;
  let period: 'S1' | 'S2' = 'S1';

  while (pending.size > 0) {
    let credits = 0;
    const semesterCourses: string[] = [];

    for (const code of pending) {
      const course = curriculum.courses.get(code)!;

      const prereqsOk = course.prerequisites.every(p => approved.has(p));
      if (!prereqsOk) continue;

      if (credits + course.credits <= maxCredits) {
        semesterCourses.push(code);
        credits += course.credits;
      }
    }

    if (semesterCourses.length === 0) break;

    semesterCourses.forEach(c => {
      approved.add(c);
      pending.delete(c);
    });

    plan.push({year,period,courses: semesterCourses,totalCredits: credits,});

    period = period === 'S1' ? 'S2' : 'S1';
    if (period === 'S1') year++;
  }

  return { plan, pending: Array.from(pending) };
}
