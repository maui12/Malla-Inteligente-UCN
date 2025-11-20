import React, { useEffect, useState } from "react";
import type { Course } from "../../../types/Course";
import type { Career } from "../../../types/Career";
import type { CourseProgress } from "../../../types/CourseProgress";
import ProfileModal from "../../../components/ProfileModal/ProfileModal";
import CourseModal from "../../../components/CourseModal/CourseModal";
import CourseCard from "../../../components/CourseCard/CourseCard";
import Button from "../../../components/Buttons/Button";
import FloatingActionButtons from "../../../components/Buttons/FloatingActionButtons";
import styles from "./CurriculumPage.module.css";
import { useLocation } from "react-router-dom";
import { fetchCurriculum, fetchCourseDetails } from "../../../api/curriculum.services";

import { sampleCareers, sampleCourses, sampleProgress } from "../../../data/sampleData";

interface LocationState {
  rut?: string;
  carreras?: Career[];
}



type CourseStatus =
  | "completed"
  | "failed"
  | "in-progress"
  | "available"
  | "blocked";

function getCourseStatus(course: Course, progress: CourseProgress[]): CourseStatus {
  const p = progress.find((x) => x.course === course.codigo);

  if (p) {
    if (p.status === "APROBADO") return "completed";
    if (p.status === "REPROBADO") return "failed";
    if (p.status === "CURSANDO") return "in-progress";
  }

 const prereqList = course.prereq ?? []; // si es undefined → []

  // Verifica que *todos* los prerequisitos estén aprobados
  const allPrereqsApproved = prereqList.every((code) =>
    progress.some((p) => p.course === code && p.status === "APROBADO")
  );

  if (allPrereqsApproved && prereqList.length > 0) {
    return "available";            // antes: available-next-semester
  }

  return "blocked";   
}

// -----------------------------------------
// Componente principal
// -----------------------------------------

export default function CurriculumPage() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const carreras =
    state.carreras && state.carreras.length > 0 ? state.carreras : sampleCareers;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career>(carreras[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [progressData, setProgressData] = useState<CourseProgress[]>(sampleProgress);



useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {

        //const curriculum = await fetchCurriculum(selectedCareer.codigo);
        //setCourses(curriculum.courses);

        // const token = localStorage.getItem("token")!;
        // const progress = await fetchMyProgress(token);
        // setProgressData(progress);

        // Por ahora seguimos usando datos locales:
        setCourses(sampleCourses);
        setProgressData(sampleProgress);
      } catch (err) {
        console.error("Error cargando backend:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [selectedCareer]);



  const niveles = courses.reduce<Record<number, Course[]>>((acc, c) => {
    if (!acc[c.nivel]) acc[c.nivel] = [];
    acc[c.nivel].push(c);
    return acc;
  }, {});

  // Función para formatear el periodo (202310 -> "2023-1")
  const formatPeriod = (period: string): string => {
    if (period.length === 6) {
      const year = period.substring(0, 4);
      const semester = period.substring(4, 6) === "10" ? "1" : "2";
      return `${year}-${semester}`;
    }
    return period;
  };

  const handleSelectCareer = (c: Career) => {
    setSelectedCareer(c);
    setModalOpen(false);
  };

  const selectedCourseProgress =
    selectedCourse && progressData.find((p) => p.course === selectedCourse.codigo);
  
  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

  const handleCreateProjection = () => {
    // TODO: Implementar lógica para crear proyección
    console.log("Crear Proyección");
  };

  const handleSaveProjection = () => {
    // TODO: Implementar lógica para guardar proyección
    console.log("Guardar Proyección");
  };

  const floatingActions = [
    { label: "Crear Proyección", variant: "green" as const, onClick: handleCreateProjection },
    { label: "Ver proyecciones guardadas", variant: "blue" as const, onClick: handleSaveProjection }
  ];

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

        <Button variant="blue" onClick={() => setModalOpen(true)}>
          Perfil
        </Button>
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
                <div key={num} className={styles.nivelGroup}>
                  <h2 className={styles.nivelTitle}>Nivel {num}</h2>
                  <div className={styles.courseList}>
                    {cursos.map((c) => {
                      return (
                        <CourseCard
                          key={c.codigo}
                          course={c}
                          courseProgress={progressData.find((p) => p.course === c.codigo)}
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
