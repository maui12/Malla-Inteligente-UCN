import React, { useState, useMemo } from "react";
import type { Course } from "../../../types/Course";
import type { Career } from "../../../types/Career";
import ProfileModal from "../../../components/ProfileModal/ProfileModal";
import CourseModal from "../../../components/CourseModal/CourseModal";
import CourseCard from "../../../components/CourseCard/CourseCard";
import Button from "../../../components/Buttons/Button";
import FloatingActionButtons from "../../../components/Buttons/FloatingActionButtons";
import styles from "./CurriculumPage.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export default function CurriculumPage() {
  const { careerCode, catalogYear } = useParams<{ careerCode: string; catalogYear: string }>();
  const { user } = useUser();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  // 1. Buscamos la carrera seleccionada dentro de los datos del usuario
  const selectedCareer = useMemo(() => {
    return user?.carreras.find(
      (c) => c.codigo === careerCode && c.catalogo === catalogYear
    ) || user?.carreras[0]; 
  }, [user, careerCode, catalogYear]);

  // 2. Agrupamos los cursos por nivel (semestre)
  const niveles = useMemo(() => {
    if (!selectedCareer) return {};
    return selectedCareer.malla.reduce<Record<number, any[]>>((acc, c) => {
      if (!acc[c.nivel]) acc[c.nivel] = [];
      acc[c.nivel].push(c);
      return acc;
    }, {});
  }, [selectedCareer]);


  const handleSelectCareer = (c: any) => {
    setModalOpen(false);
    navigate(`/malla/${c.codigo}/${c.catalogo}`);
  };

  const openCourseModal = (course: any) => {
    setSelectedCourse(course);
  };

  const floatingActions = [
    { label: "Crear Proyección", variant: "green" as const, onClick: () => navigate('/proyeccion/${careerCode}/${catalogYear}') },
    { label: "Ver proyecciones guardadas", variant: "blue" as const, onClick: () => console.log("Ver") }
  ];

  if (!user || !selectedCareer) {
    return <div className={styles.loading}>Cargando datos del estudiante...</div>;
  }

  return (
    <div className={styles.container} role="main">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Malla Curricular</h1>
          <div className={styles.sub}>
            <span className={styles.carreraName}>{selectedCareer.nombre}</span>{" "}
            <span className={styles.catalogo}>
              (Catálogo {selectedCareer.catalogo} - Estudiante: {user.name})
            </span>
          </div>
        </div>

        <Button variant="blue" onClick={() => setModalOpen(true)}>
          Perfil / Carreras
        </Button>
      </header>

      <section className={styles.grid}>
        {Object.keys(niveles)
          .sort((a, b) => Number(a) - Number(b))
          .map((num) => {
            const cursos = niveles[Number(num)];
            return (
              <div key={num} className={styles.nivelGroup}>
                <h2 className={styles.nivelTitle}>Semestre {num}</h2>
                <div className={styles.courseList}>
                  {cursos.map((c) => (
                    <CourseCard
                      key={c.codigo}
                      course={c}
                      onClick={() => openCourseModal(c)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
      </section>

      {modalOpen && (
        <ProfileModal
          carreras={user.carreras}
          selectedCareer={selectedCareer}
          onSelectCareer={handleSelectCareer}
          onClose={() => setModalOpen(false)}
        />
      )}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          courseProgress={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
      
      <FloatingActionButtons actions={floatingActions} position="bottom-left" />
    </div>
  );
}