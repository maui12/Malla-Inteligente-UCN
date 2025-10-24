import React from 'react';
import type { Course } from '../types';

interface CourseCardProps extends Course {
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  name,
  code,
  credits,
  status,
  onClick,
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'aprobado':
        return {
          card: 'bg-green-100 border-green-300 shadow-green-200/50',
          text: 'text-green-700'
        };
      case 'cursando':
        return {
          card: 'bg-pink-100 border-pink-300 shadow-pink-200/50',
          text: 'text-pink-700'
        };
      case 'reprobado':
        return {
          card: 'bg-red-100 border-red-400 shadow-red-200/50',
          text: 'text-red-700'
        };
      case 'pendiente':
        return {
          card: 'bg-yellow-100 border-yellow-300 shadow-yellow-200/50',
          text: 'text-yellow-700'
        };
      case 'futuro':
      default:
        return {
          card: 'bg-blue-50 border-blue-200 shadow-blue-200/50',
          text: 'text-blue-700'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div
      onClick={onClick}
      className={`${styles.card} border-2 rounded-lg p-3 shadow-md w-full h-full text-sm cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl flex flex-col justify-between`}
    >
      {/* Código y créditos */}
      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold uppercase text-gray-700">{code}</span>
        <span className="text-xs font-medium text-gray-500">({credits}C)</span>
      </div>
      {/* Nombre del curso */}
      <h3 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2">{name}</h3>
      {/* Estado */}
      <p className={`${styles.text} text-xs font-medium text-right mt-1`}>
        {status.toUpperCase()}
      </p>
    </div>
  );
};

export default CourseCard;