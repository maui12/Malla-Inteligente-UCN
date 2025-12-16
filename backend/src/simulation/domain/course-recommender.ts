import { Curriculum } from '../../curriculum/curriculum.service';

/**
 * Devuelve ramos sugeridos para completar un semestre
 * la prioridad funciona así:
 * 1. ramos que desbloquean más ramos
 * 2. ramos que quepan en los créditos restantes
 */
export function suggestCourses(params: {
  curriculum: Curriculum;
  approved: Set<string>;
  takenThisSemester: string[];
  maxCredits: number;
}) {
  const { curriculum, approved, takenThisSemester, maxCredits } = params;

  let currentCredits = takenThisSemester.reduce((acc, code) => {
    return acc + (curriculum.courses.get(code)?.credits ?? 0);
  }, 0);

  const suggestions: string[] = [];

  // ramos pendientes y tomables
  const pending = Array.from(curriculum.courses.values()).filter((course) => {
    if (approved.has(course.code)) return false;
    if (takenThisSemester.includes(course.code)) return false;

    return course.prerequisites.every((p) => approved.has(p));
  });

  // ordenar por "desbloqueo" (cuántos ramos dependen de él)
  pending.sort((a, b) => {
    const unlocksA = Array.from(curriculum.courses.values()).filter((c) =>
      c.prerequisites.includes(a.code),
    ).length;

    const unlocksB = Array.from(curriculum.courses.values()).filter((c) =>
      c.prerequisites.includes(b.code),
    ).length;

    return unlocksB - unlocksA;
  });

  // agregar mientras quepan créditos
  for (const course of pending) {
    if (currentCredits + course.credits > maxCredits) continue;

    suggestions.push(course.code);
    currentCredits += course.credits;
  }

  return suggestions;
}
