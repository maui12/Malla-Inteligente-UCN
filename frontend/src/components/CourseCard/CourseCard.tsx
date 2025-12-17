import React from 'react';
import type { Course } from '../../types/course';
import type { CourseProgress } from '../../types/CourseProgress';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
  courseProgress?: CourseProgress;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  courseProgress, 
  onClick 
}) => {
  const getStatusClass = () => {
    if (!courseProgress) return styles.available;
    if (courseProgress.status === 'approved') return styles.completed;
    if (courseProgress.status === 'failed') return styles.failed;
    return styles.available;
  };

  return (
    <div 
      className={`${styles.card} ${getStatusClass()}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.code}>{course.code}</div>
      <div className={styles.name}>{course.name}</div>
      <div className={styles.credits}>{course.credits} créditos</div>
      
      {courseProgress && (
        <div className={styles.status}>
          {courseProgress.status === 'approved' && '✓ Aprobado'}
          {courseProgress.status === 'failed' && '✗ Reprobado'}
        </div>
      )}
    </div>
  );
};

export default CourseCard;