import React from 'react';
import type { Semester } from '../types';

interface MallaHeaderProps {
  semestres: Semester[];
  currentSemesterId: string;
}

export const MallaHeader: React.FC<MallaHeaderProps> = ({
  semestres,
  currentSemesterId,
}) => {
  return (
    <div className="sticky top-0 z-20 bg-white">
      {/* Header principal: nombres de semestres */}
      <div
        className="grid shadow-md border-b border-gray-200"
        style={{
          gridTemplateColumns: `auto repeat(${semestres.length}, minmax(180px, 1fr))`,
        }}
      >
        <div className="h-14 bg-gray-50"></div>
        {semestres.map((sem) => (
          <div
            key={sem.id}
            className="text-center py-3 font-bold text-gray-600 border-r border-gray-200 bg-white"
          >
            {sem.name}
          </div>
        ))}
      </div>
      
      {/* Sub-header: período o situación */}
      <div
        className="grid bg-gray-50 border-b border-gray-200"
        style={{
          gridTemplateColumns: `auto repeat(${semestres.length}, minmax(180px, 1fr))`,
        }}
      >
        <div className="text-sm px-2 py-1 font-semibold text-gray-800 flex items-center h-10 bg-gray-50">
          Situación
        </div>
        {semestres.map((sem) => (
          <div
            key={sem.id}
            className={`text-center text-xs py-1 border-r border-gray-200 flex items-center justify-center ${
              sem.id === currentSemesterId ? 'bg-yellow-200/50 font-bold' : 'text-gray-500'
            }`}
          >
            {sem.id}
          </div>
        ))}
      </div>
    </div>
  );
};