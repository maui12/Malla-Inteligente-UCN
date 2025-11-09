import React from "react";
import styles from "./SemesterColumn.module.css";
import CourseCard from "../CourseCard/CourseCard";
import type { Course } from "../../types/course";

interface Props {
  semesterLabel: string;
  year: string;
  courses: Course[];
}

const SemesterColumn: React.FC<Props> = ({ semesterLabel, year, courses }) => {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h4>{semesterLabel}</h4>
        <span>{year}</span>
      </div>
      <div className={styles.courseList}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default SemesterColumn;
