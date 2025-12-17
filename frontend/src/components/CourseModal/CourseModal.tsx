import React from 'react';
import type { Course } from '../../types/course';
import type { CourseProgress } from '../../types/CourseProgress';
import styles from './CourseModal.module.css';
import Button from '../Buttons/Button';

interface CourseModalProps {
  course: Course;
  courseProgress?: CourseProgress;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ 
  course, 
  courseProgress, 
  onClose 
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2>{course.name}</h2>
        <p className={styles.code}>Código: {course.code}</p>
        <p>Créditos: {course.credits}</p>
        
        {course.recommendedSemester && (
          <p>Semestre recomendado: {course.recommendedSemester}</p>
        )}
        
        {course.prerequisites && course.prerequisites.length > 0 && (
          <div className={styles.prerequisites}>
            <h3>Prerequisitos:</h3>
            <ul>
              {course.prerequisites.map((prereq) => (
                <li key={prereq}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}
        
        {courseProgress && (
          <div className={styles.progress}>
            <h3>Tu progreso:</h3>
            <p>Estado: {courseProgress.status === 'approved' ? 'Aprobado' : 'Reprobado'}</p>
            <p>Año: {courseProgress.year}</p>
            <p>Período: {courseProgress.period}</p>
          </div>
        )}
        
        <Button variant="blue" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default CourseModal;