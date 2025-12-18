import React from "react";
import styles from "./CourseCard.module.css";
import type { Course } from "../../types/Course";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const status = course.status ?? "PENDIENTE";

  const statusClass = {
    APROBADO: styles.aprobado,
    REPROBADO: styles.reprobado,
    PENDIENTE: styles.pendiente,
    CURSANDO: styles.cursando,
    DISPONIBLE: styles.disponible,
  }[status] || styles.pendiente;

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardTitle}>{course.asignatura}</div>

      <div className={`${styles.statusBadge} ${statusClass}`}>
        {status}
      </div>

      <div className={styles.details}>
        <p><strong>Código:</strong> {course.codigo}</p>
        <p><strong>Créditos:</strong> {course.creditos}</p>
        {course.period && <p><strong>Periodo:</strong> {course.period}</p>}
      </div>
    </div>
  );
}