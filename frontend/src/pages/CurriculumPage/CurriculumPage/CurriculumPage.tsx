import React, { useEffect, useState } from "react";
import type { Course } from "../../../types/course";
import type { Career } from "../../../types/Career";
import type { CourseProgress } from "../../../types/CourseProgress";
import ProfileModal from "../../../components/ProfileModal/ProfileModal";
import CourseModal from "../../../components/CourseModal/CourseModal";
import CourseCard from "../../../components/CourseCard/CourseCard";
import Button from "../../../components/Buttons/Button";
import FloatingActionButtons from "../../../components/Buttons/FloatingActionButtons";
import styles from "./CurriculumPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { 
  fetchCurriculum, 
  fetchMyProgress 
} from "../../../api/curriculum.services";

type CourseStatus =
  | "completed"
  | "failed"
  | "in-progress"
  | "available"
  | "blocked";

/**
 * Determina el estado de un curso basado en el progreso del estudiante
 */
function getCourseStatus(course: Course, progress: CourseProgress[]): CourseStatus {
  // Verificar si el curso ya fue cursado
  const courseProgress = progress.find((p) => p.courseCode === course.code);

  if (courseProgress) {
    if (courseProgress.status === "approved") return "completed";
    if (courseProgress.status === "failed") return "failed";
  }

  // Verificar prerequisitos
  const prereqList = course.prerequisites ?? [];

  if (prereqList.length === 0) {
    // Sin prerequisitos = disponible
    return "available";
  }

  const allPrereqsApproved = prereqList.every((code) =>
    progress.some((p) => p.courseCode === code && p.status === "approved")
  );

  if (allPrereqsApproved) {
    return "available";
  }

  return "blocked";
}

export default function CurriculumPage() {
  const { userId, careerCode, catalogYear } = useParams<{
    userId: string;
    careerCode: string;
    catalogYear: string;
  }>();

  const { user } = useUser();
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [progressData, setProgressData] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Career basada en los parámetros de la URL
  const [selectedCareer] = useState<Career>({
    codigo: careerCode || '',
    nombre: getCareerName(careerCode || ''),
    catalogo: parseInt(catalogYear || '0'),
  });

  useEffect(() => {
    async function loadData() {
      if (!careerCode) {
        setError('Código de carrera no especificado');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Cargar cursos de la malla curricular
        const curriculumData = await fetchCurriculum(careerCode);
        
        // Convertir el objeto Record a array
        const coursesArray = Object.values(curriculumData.courses);
        setCourses(coursesArray);

        // Cargar progreso del estudiante
        const progress = await fetchMyProgress();
        setProgressData(progress);

      } catch (err: any) {
        console.error("Error cargando datos:", err);
        
        if (err.response?.status === 404) {
          setError('Malla curricular no encontrada para esta carrera');
        } else if (err.response?.status === 401) {
          setError('Sesión expirada. Por favor inicia sesión nuevamente.');
          setTimeout(() => navigate('/login'), 2000);
        } else {
          setError(
            err.response?.data?.message || 
            'Error al cargar la información. Intenta nuevamente.'
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [careerCode, navigate]);

  // Agrupar cursos por nivel/semestre recomendado
  const niveles = courses.reduce<Record<number, Course[]>>((acc, c) => {
    const nivel = c.recommendedSemester ?? 0;
    if (!acc[nivel]) acc[nivel] = [];
    acc[nivel].push(c);
    return acc;
  }, {});

  const selectedCourseProgress =
    selectedCourse && progressData.find((p) => p.courseCode === selectedCourse.code);

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleCreateProjection = () => {
    navigate(`/malla/crear_proyeccion/${userId}/${selectedCareer.codigo}`);
  };

  const handleSaveProjection = () => {
    navigate(`/proyecciones/${userId}`);
  };

  const floatingActions = [
    { 
      label: "Crear Proyección", 
      variant: "green" as const, 
      onClick: handleCreateProjection 
    },
    { 
      label: "Ver proyecciones guardadas", 
      variant: "blue" as const, 
      onClick: handleSaveProjection 
    }
  ];

  // Manejo de errores
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Error</h2>
          <p>{error}</p>
          <Button variant="blue" onClick={() => navigate('/login')}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} role="main" aria-labelledby="page-title">
      <header className={styles.header}>
        <div>
          <h1 id="page-title" className={styles.title}>
            Malla Curricular
          </h1>
          <div className={styles.sub}>
            <span className={styles.carreraName}>
              {selectedCareer.nombre}
            </span>{" "}
            <span className={styles.catalogo}>
              (Catálogo {selectedCareer.catalogo} - {user?.email})
            </span>
          </div>
        </div>

        <Button
          variant="blue"
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
          onClick={() => setModalOpen(true)}
        >
          Perfil
        </Button>
      </header>

      {loading ? (
        <div className={styles.loading}>
          Cargando malla curricular...
        </div>
      ) : (
        <section className={styles.grid}>
          {Object.keys(niveles)
            .sort((a, b) => Number(a) - Number(b))
            .map((num) => {
              const cursos = niveles[Number(num)];
              return (
                <div key={num} className={styles.nivelGroup}>
                  <h2 className={styles.nivelTitle}>
                    {Number(num) === 0 ? 'Sin Nivel Asignado' : `Nivel ${num}`}
                  </h2>
                  <div className={styles.courseList}>
                    {cursos.map((c) => {
                      const progress = progressData.find(
                        (p) => p.courseCode === c.code
                      );
                      
                      return (
                        <CourseCard
                          key={c.code}
                          course={c}
                          courseProgress={progress}
                          onClick={() => openCourseModal(c)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </section>
      )}

      {modalOpen && (
        <ProfileModal
          carreras={[selectedCareer]}
          selectedCareer={selectedCareer}
          onSelectCareer={() => {}}
          onClose={() => setModalOpen(false)}
        />
      )}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          courseProgress={selectedCourseProgress ?? undefined}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      <FloatingActionButtons
        actions={floatingActions}
        position="bottom-left"
      />
    </div>
  );
}

// Helper para obtener nombre de carrera
function getCareerName(code: string): string {
  const careers: Record<string, string> = {
    'ICI': 'Ingeniería Civil Informática',
    'ICO': 'Ingeniería Civil Industrial',
    'IME': 'Ingeniería Civil Mecánica',
    'IEL': 'Ingeniería Civil Eléctrica',
    'IQU': 'Ingeniería Civil Química',
    // Agrega más carreras según necesites
  };
  return careers[code] || code;
}