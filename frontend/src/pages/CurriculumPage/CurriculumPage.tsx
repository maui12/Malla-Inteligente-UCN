// src/pages/CurriculumPage/CurriculumPage.tsx
import React, { useEffect, useState } from "react";
import { fetchCourses } from "../../services/api";
import type { Course } from "../../types/Course";
import type { CourseProgress } from "../../types/CourseProgress";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import CourseModal from "../../components/CourseModal/CourseModal";
import styles from "./CurriculumPage.module.css";
import { useLocation } from "react-router-dom";
import type { Carrera } from "../../types/Carrera";

interface LocationState {
  rut?: string;
  carreras?: Carrera[];
}

const defaultCareers: Carrera[] = [
  { codigo: "8266", nombre: "Ingeniería Civil en Computación", catalogo: "202410" },
  { codigo: "8606", nombre: "Ingeniería Civil Industrial", catalogo: "201610" },
];

export default function CurriculumPage() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const carreras =
    state.carreras && state.carreras.length > 0 ? state.carreras : defaultCareers;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Carrera>(carreras[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // (Futuro) Datos de avance de alumno
  const [progressData, setProgressData] = useState<CourseProgress[]>([]);

  useEffect(() => {
    setLoading(true);
    fetchCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        console.error("Error cargando cursos:", err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCareer]);

  // Agrupar cursos por nivel
  const niveles = courses.reduce<Record<number, Course[]>>((acc, c) => {
    if (!acc[c.nivel]) acc[c.nivel] = [];
    acc[c.nivel].push(c);
    return acc;
  }, {});

  const handleSelectCareer = (c: Carrera) => {
    setSelectedCareer(c);
    setModalOpen(false);
  };

  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

  // Buscar progreso del curso seleccionado
  const selectedCourseProgress =
    selectedCourse && progressData.find((p) => p.course === selectedCourse.codigo);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Malla Curricular</h1>
          <div className={styles.sub}>
            <span className={styles.carreraName}>{selectedCareer.nombre}</span>{" "}
            <span className={styles.catalogo}>
              (Catálogo {selectedCareer.catalogo})
            </span>
          </div>
        </div>

        <div>
          <button className={styles.profileButton} onClick={() => setModalOpen(true)}>
            Perfil
          </button>
        </div>
      </header>

      {loading ? (
        <div className={styles.loading}>Cargando malla curricular...</div>
      ) : (
        <section className={styles.grid}>
          {Object.keys(niveles)
            .sort((a, b) => Number(a) - Number(b))
            .map((num) => {
              const cursos = niveles[Number(num)];
              return (
                <article key={num} className={styles.column}>
                  <h2 className={styles.semTitle}>Nivel {num}</h2>
                  <div className={styles.courseList}>
                    {cursos.map((c) => (
                      <div
                        key={c.codigo}
                        className={styles.card}
                        onClick={() => openCourseModal(c)}
                      >
                        <div className={styles.courseName}>{c.asignatura}</div>
                        <div className={styles.meta}>
                          <span>{c.creditos} créditos</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
        </section>
      )}

      {modalOpen && (
        <ProfileModal
          carreras={carreras}
          selectedCareer={selectedCareer}
          onSelectCareer={handleSelectCareer}
          onClose={() => setModalOpen(false)}
        />
      )}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          courseProgress={selectedCourseProgress}
          onClose={closeCourseModal}
        />
      )}
    </div>
  );
}
