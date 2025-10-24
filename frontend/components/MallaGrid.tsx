import React from 'react';
import type { Course, Semester } from '../types';
import CourseCard from './CourseCard';

interface MallaGridProps {
  semestres: Semester[];
  currentSemesterId: string;
  handleCourseClick: (course: Course) => void;
}

export const MallaGrid: React.FC<MallaGridProps> = ({
  semestres,
  currentSemesterId,
  handleCourseClick,
}) => {
  const maxRows = Math.max(...semestres.map((s) => s.courses.length));

  return (
    <div className="w-full overflow-x-auto border border-gray-300 rounded-lg shadow-lg">
      <div style={{ minWidth: 'max-content' }}>
        {/* Header de semestres */}
        <div 
          className="grid bg-white border-b-2 border-gray-300"
          style={{
            display: 'grid',
            gridTemplateColumns: `80px repeat(${semestres.length}, 200px)`,
          }}
        >
          <div className="bg-gray-50 border-r border-gray-200 flex items-center justify-center font-semibold text-sm">
            #
          </div>
          {semestres.map((sem) => (
            <div
              key={sem.id}
              className="border-r border-gray-200 p-3 text-center"
            >
              <div className="font-bold text-gray-700 text-lg">{sem.name}</div>
              <div className={`text-xs mt-1 ${
                sem.id === currentSemesterId ? 'bg-yellow-200 font-bold px-2 py-1 rounded' : 'text-gray-500'
              }`}>
                {sem.id}
              </div>
            </div>
          ))}
        </div>

        {/* Grid de cursos */}
        {Array.from({ length: maxRows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid border-b border-gray-200"
            style={{
              display: 'grid',
              gridTemplateColumns: `80px repeat(${semestres.length}, 200px)`,
              minHeight: '140px',
            }}
          >
            {/* Número de fila */}
            <div className="bg-gray-50 border-r border-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
              {rowIndex + 1}
            </div>
            
            {/* Cursos */}
            {semestres.map((sem) => (
              <div
                key={sem.id}
                className="p-3 border-r border-gray-200 flex items-stretch"
              >
                {sem.courses[rowIndex] && (
                  <CourseCard
                    {...sem.courses[rowIndex]}
                    onClick={() => handleCourseClick(sem.courses[rowIndex])}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};