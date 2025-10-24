import { useState, useCallback } from 'react';
import { MallaGrid } from '../components/MallaGrid';
import { ControlsPanel } from '../components/ControlsPanel';
import type { Course, Semester } from '../types'; 
import './index.css';

const mockData: Semester[] = [
  {
    id: "2024-I",
    name: "I",
    courses: [
      { name: "Cálculo I", code: "MAT-101", credits: 6, status: "aprobado", prereqCodes: [], nivelTeorico: 1 },
      { name: "Álgebra I", code: "MAT-102", credits: 6, status: "aprobado", prereqCodes: [], nivelTeorico: 1 },
      { name: "Programación", code: "INF-101", credits: 6, status: "aprobado", prereqCodes: [], nivelTeorico: 1 },
      { name: "PR. INTRO. A LA INGENIERÍA", code: "ING-100", credits: 3, status: "aprobado", prereqCodes: [], nivelTeorico: 1 },
    ],
  },
  {
    id: "2024-II",
    name: "II",
    courses: [
      { name: "Cálculo II", code: "MAT-201", credits: 6, status: "aprobado", prereqCodes: ['MAT-101'], nivelTeorico: 2 },
      { name: "Álgebra II", code: "MAT-202", credits: 6, status: "reprobado", prereqCodes: ['MAT-102'], nivelTeorico: 2 }, 
      { name: "Programación Avanzada", code: "INF-102", credits: 6, status: "cursando", prereqCodes: ['INF-101'], nivelTeorico: 2 },
    ],
  },
  {
    id: "2025-I",
    name: "III",
    courses: [
      { name: "Cálculo III", code: "MAT-301", credits: 6, status: "pendiente", prereqCodes: ['MAT-201'], nivelTeorico: 3 }, 
      { name: "Álgebra III", code: "MAT-302", credits: 6, status: "pendiente", prereqCodes: ['MAT-202'], nivelTeorico: 3 }, 
      { name: "Estructuras de Datos", code: "INF-201", credits: 6, status: "pendiente", prereqCodes: ['INF-102'], nivelTeorico: 3 },
    ],
  },
  {
    id: "2025-II",
    name: "IV",
    courses: [
      { name: "Cálculo IV", code: "MAT-401", credits: 6, status: "futuro", prereqCodes: ['MAT-301'], nivelTeorico: 4 },
      { name: "Álgebra IV", code: "MAT-402", credits: 6, status: "futuro", prereqCodes: ['MAT-302'], nivelTeorico: 4 },
      { name: "Bases de Datos", code: "INF-301", credits: 6, status: "futuro", prereqCodes: ['INF-201'], nivelTeorico: 4 },
    ],
  },
  {
    id: "2026-I",
    name: "V",
    courses: [
      { name: "Estadística", code: "EST-500", credits: 6, status: "futuro", prereqCodes: ['MAT-401'], nivelTeorico: 5 },
      { name: "Fundamentos de la Computación", code: "INF-300", credits: 6, status: "futuro", prereqCodes: ['INF-201'], nivelTeorico: 5 },
    ],
  },
  {
    id: "2026-II",
    name: "VI",
    courses: [
      { name: "Redes I", code: "RED-601", credits: 6, status: "futuro", prereqCodes: ['INF-300'], nivelTeorico: 6 },
    ],
  },
];

const currentSemesterId = "2025-I"; 

const App = () => {
  const [projectionMode, setProjectionMode] = useState<'manual' | 'auto'>('manual');
  const semestres = mockData;
  
  const handleCourseClick = useCallback((course: Course) => {
    console.log(`Curso seleccionado: ${course.name}`);
  }, []);

  const handleNewProjection = () => {
    console.log("Iniciando nueva proyección.");
  };
  
  const handleViewSaved = () => {
    console.log("Abriendo el panel de proyecciones guardadas...");
  };

  return (
    <div className="app-container p-4 md:p-8 max-w-full">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Malla Curricular - Ingeniería Civil en Computación
        </h1>
        <p className="text-sm text-gray-600">
          ¡Bienvenido, Estudiante! Estado de Proyección: Modo <span className="font-bold text-blue-600">{projectionMode.toUpperCase()}</span>
        </p>
      </header>
      
      <MallaGrid 
        semestres={semestres} 
        currentSemesterId={currentSemesterId} 
        handleCourseClick={handleCourseClick} 
      />

      <ControlsPanel 
        mode={projectionMode}
        onModeChange={setProjectionMode}
        onNewProjection={handleNewProjection}
        onViewSaved={handleViewSaved}
      />
    </div>
  );
};

export default App;