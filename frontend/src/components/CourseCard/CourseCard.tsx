import React from "react";
import styles from "./CourseCard.module.css";
import type { Course } from "../../types/course";

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  return (
    <div className={`${styles.card} ${styles[course.status]}`}>
      {course.name}
    </div>
  );
};

export default CourseCard;
