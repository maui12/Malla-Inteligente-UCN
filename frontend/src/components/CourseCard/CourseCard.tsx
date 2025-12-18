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
      <div className={styles.topSection}>
        <h4 className={styles.cardTitle}>{course.asignatura}</h4>
        <div className={styles.courseInfo}>
          {course.codigo} • {course.creditos} Cr.
        </div>
      </div>
      
      <div className={`${styles.status} ${statusClass}`}>
        {status}
      </div>
    </div>
  );
}