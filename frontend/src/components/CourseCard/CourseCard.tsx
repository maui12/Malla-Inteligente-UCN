import React from "react";
import styles from "./CourseCard.module.css";
import type { Course } from "../../types/Course";
import type { CourseProgress } from "../../types/CourseProgress";

interface CourseCardProps {
  course: Course;
  courseProgress?: CourseProgress;
  onClick?: () => void;
}

export default function CourseCard({ course, courseProgress, onClick }: CourseCardProps) {
  const status = courseProgress?.status ?? "DISPONIBLE";

  // Mapear estado → clase CSS
  const statusClass = {
    APROBADO: styles.aprobado,
    REPROBADO: styles.reprobado,
    CURSANDO: styles.cursando,
    "DISPONIBLE PROXIMO SEMESTRE": styles.disponibleprox,
    DISPONIBLE: styles.disponible
  }[status] ?? styles.disponible;

  
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardTitle}>{course.asignatura}</div>

      <div className={`${styles.status} ${statusClass}`}>
        {status}
      </div>

      <div><strong>Código:</strong> {course.codigo}</div>
      <div><strong>Créditos:</strong> {course.creditos}</div>
    </div>
  );
}
