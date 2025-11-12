// src/components/CourseModal/CourseModal.tsx
import React from "react";
import styles from "./CourseModal.module.css";
import type { Course } from "../../types/Course";
import type { CourseProgress } from "../../types/CourseProgress";

interface CourseModalProps {
  course: Course;
  courseProgress?: CourseProgress | null; // ahora opcional
  onClose: () => void;
}

export default function CourseModal({
  course,
  courseProgress,
  onClose,
}: CourseModalProps) {
  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <h2>{course.asignatura}</h2>
        <p><strong>Código Curso:</strong> {course.codigo}</p>

        {!courseProgress ? (
          <p className={styles.noProgress}>
            ⚠️ No hay información de progreso disponible para este curso.
          </p>
        ) : (
          <div className={styles.infoSection}>
            <p><strong>NRC:</strong> {courseProgress.nrc ?? "—"}</p>
            <p><strong>Período:</strong> {courseProgress.period ?? "—"}</p>
            <p><strong>Inscripción:</strong> {courseProgress.inscriptionType ?? "—"}</p>
            <p><strong>Estado:</strong> {courseProgress.status ?? "—"}</p>
            <p><strong>Excluido:</strong> {courseProgress.excluded ? "Sí" : "No"}</p>
          </div>
        )}

        <button className={styles.closeButton} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
