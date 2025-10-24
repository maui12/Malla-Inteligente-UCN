import React from 'react';

interface ControlsPanelProps {
  mode: 'manual' | 'auto';
  onModeChange: (newMode: 'manual' | 'auto') => void;
  onNewProjection: () => void;
  onViewSaved: () => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  mode,
  onModeChange,
  onNewProjection,
  onViewSaved,
}) => {
  return (
    <div className="mt-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
      {/* Botones Proyección */}
      <div className="flex gap-3">
        <button
          onClick={onNewProjection}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md flex items-center gap-2 transition duration-150 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nueva Proyección
        </button>
        <button
          onClick={onViewSaved}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow-md flex items-center gap-2 transition duration-150 text-sm"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4l4 4"></path>
          </svg>
          Ver Proyecciones Guardadas
        </button>
      </div>
      
      {/* Selector Modo */}
      <div className="flex bg-gray-200 p-1 rounded-lg shadow-inner">
        <button
          onClick={() => onModeChange('manual')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition duration-200 ${
            mode === 'manual' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-300'
          }`}
        >
          Modo Manual
        </button>
        <button
          onClick={() => onModeChange('auto')}
          className={`px-4 py-1.5 text-sm font-semibold rounded-md transition duration-200 ${
            mode === 'auto' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-300'
          }`}
        >
          Modo Automático
        </button>
      </div>
    </div>
  );
};