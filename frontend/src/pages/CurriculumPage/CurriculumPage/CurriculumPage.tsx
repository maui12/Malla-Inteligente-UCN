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
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { fetchCurriculum, fetchCourseDetails } from "../../../api/curriculum.services";

import { sampleCareers, sampleCourses, sampleProgress } from "../../../data/sampleData";

interface LocationState {
  rut: string;
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

 const prereqList = course.prereq ?? []; 

  const allPrereqsApproved = prereqList.every((code) =>
    progress.some((p) => p.course === code && p.status === "APROBADO")
  );

  if (allPrereqsApproved && prereqList.length > 0) {
    return "available";            
  }

  return "blocked";   
}

// -----------------------------------------
// Componente principal
// -----------------------------------------

export default function CurriculumPage() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const { user } = useUser();

  const carreras =
    state.carreras && state.carreras.length > 0 ? state.carreras : sampleCareers;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career>(carreras[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [progressData, setProgressData] = useState<CourseProgress[]>(sampleProgress);
  const navigate = useNavigate();



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

  const handleSelectCareer = (c: Career) => {
    setSelectedCareer(c);
    setModalOpen(false);
  };

  const selectedCourseProgress =
    selectedCourse && progressData.find((p) => p.course === selectedCourse.codigo);
  
  const openCourseModal = (course: Course) => {
    setSelectedCourse(course);
  };


  const handleCreateProjection = () => {
    navigate(`/malla/crear_proyeccion/1/${selectedCareer.codigo}`)  //CAMBIAR
      //${rut}/${carrera.codigo}`)

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
    <div className={styles.container} role="main" aria-labelledby="page-title">
      <header className={styles.header}>
        <div>
          <h1 id="page-title" className={styles.title}>Malla Curricular</h1>
          <div className={styles.sub}>
            <span className={styles.carreraName}>{selectedCareer.nombre}</span>{" "}
            <span className={styles.catalogo}>
              (Catálogo {selectedCareer.catalogo} {user?.email})
            </span>
          </div>
        </div>

        <Button variant="blue" 
          aria-haspopup="dialog"
          aria-expanded={modalOpen}
          aria-controls={modalOpen ? "profile-modal" : undefined}
          onClick={() => setModalOpen(true)}>
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
