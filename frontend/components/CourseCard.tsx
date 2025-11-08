import type { Course } from '../types';

interface CourseCardProps extends Course {
  onClick: () => void;
}

const CourseCard = ({ name, code, credits, status, onClick }: Course & { onClick: () => void }) => {
  if (status === 'aprobado') {
    return (
      <div
        onClick={onClick}
        className="bg-green-100 border-2 border-green-400 rounded-xl p-4 shadow-lg hover:shadow-2xl w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase text-green-800 bg-green-200 px-2 py-1 rounded-md">{code}</span>
          <span className="text-xs font-semibold text-green-600 bg-white px-2 py-1 rounded-full shadow-sm">{credits}C</span>
        </div>
        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-2">{name}</h3>
        <div className="flex items-center justify-end gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-xs font-bold text-green-700 uppercase">Aprobado</p>
        </div>
      </div>
    );
  }

  if (status === 'cursando') {
    return (
      <div
        onClick={onClick}
        className="bg-pink-100 border-2 border-pink-400 rounded-xl p-4 shadow-lg hover:shadow-2xl w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase text-pink-800 bg-pink-200 px-2 py-1 rounded-md">{code}</span>
          <span className="text-xs font-semibold text-pink-600 bg-white px-2 py-1 rounded-full shadow-sm">{credits}C</span>
        </div>
        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-2">{name}</h3>
        <div className="flex items-center justify-end gap-1">
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          <p className="text-xs font-bold text-pink-700 uppercase">Cursando</p>
        </div>
      </div>
    );
  }

  if (status === 'reprobado') {
    return (
      <div
        onClick={onClick}
        className="bg-red-100 border-2 border-red-500 rounded-xl p-4 shadow-lg hover:shadow-2xl w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase text-red-800 bg-red-200 px-2 py-1 rounded-md">{code}</span>
          <span className="text-xs font-semibold text-red-600 bg-white px-2 py-1 rounded-full shadow-sm">{credits}C</span>
        </div>
        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-2">{name}</h3>
        <div className="flex items-center justify-end gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <p className="text-xs font-bold text-red-700 uppercase">Reprobado</p>
        </div>
      </div>
    );
  }

  if (status === 'pendiente') {
    return (
      <div
        onClick={onClick}
        className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 shadow-lg hover:shadow-2xl w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col justify-between"
      >
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-bold uppercase text-yellow-800 bg-yellow-200 px-2 py-1 rounded-md">{code}</span>
          <span className="text-xs font-semibold text-yellow-600 bg-white px-2 py-1 rounded-full shadow-sm">{credits}C</span>
        </div>
        <h3 className="text-sm font-bold text-gray-800 leading-tight mb-2">{name}</h3>
        <div className="flex items-center justify-end gap-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <p className="text-xs font-bold text-yellow-700 uppercase">Pendiente</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 shadow-md hover:shadow-xl w-full h-full cursor-pointer transition-all duration-300 hover:scale-105 flex flex-col justify-between opacity-75 hover:opacity-100"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold uppercase text-blue-800 bg-blue-200 px-2 py-1 rounded-md">{code}</span>
        <span className="text-xs font-semibold text-blue-600 bg-white px-2 py-1 rounded-full shadow-sm">{credits}C</span>
      </div>
      <h3 className="text-sm font-bold text-gray-700 leading-tight mb-2">{name}</h3>
      <div className="flex items-center justify-end gap-1">
        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        <p className="text-xs font-bold text-blue-600 uppercase">Futuro</p>
      </div>
    </div>
  );
};

export default CourseCard;