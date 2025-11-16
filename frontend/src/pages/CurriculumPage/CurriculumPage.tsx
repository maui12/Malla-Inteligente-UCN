import React, { useEffect, useState } from "react";
import type { Course } from "../../types/Course";
import type { CourseProgress } from "../../types/CourseProgress";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import CourseModal from "../../components/CourseModal/CourseModal";
import CourseCard from "../../components/CourseCard/CourseCard";
import Button from "../../components/Buttons/Button";
import styles from "./CurriculumPage.module.css";
import { useLocation } from "react-router-dom";
import type { Career } from "../../types/Career";

interface LocationState {
  rut?: string;
  carreras?: Career[];
}

//borrar despues

const defaultCareers: Career[] = [
  { codigo: "8266", nombre: "Ingeniería Civil en Computación", catalogo: "202410", courses: {} },
  { codigo: "8606", nombre: "Ingeniería Civil Industrial", catalogo: "201610", courses: {}  },
];


const sampleCourses: Course[] = [
  { codigo: "DCCB-00107", asignatura: "Álgebra I", creditos: 6, nivel: 1, prereq: [] },
  { codigo: "DCCB-00106", asignatura: "Cálculo I", creditos: 6, nivel: 1, prereq: [] },
  { codigo: "DDOC-00102", asignatura: "Comunicación Efectiva", creditos: 4, nivel: 1, prereq: [] },

  { codigo: "DCCB-00210", asignatura: "Programación I", creditos: 6, nivel: 2, prereq: ["DCCB-00107", "DCCB-00106"] },
  { codigo: "SSED-00102", asignatura: "Proyecto", creditos: 2, nivel: 2, prereq: [] },
  { codigo: "DAMA-00235", asignatura: "Física I", creditos: 6, nivel: 2, prereq: ["DCCB-00106"] },

  { codigo: "DCCB-00320", asignatura: "Estructuras de Datos", creditos: 6, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DCCB-00330", asignatura: "Arquitectura de Computadores", creditos: 6, nivel: 3, prereq: ["DCCB-00210"] },
  { codigo: "DAMA-00340", asignatura: "Cálculo II", creditos: 6, nivel: 3, prereq: ["DCCB-00106"] },

  { codigo: "DCCB-00415", asignatura: "Bases de Datos", creditos: 6, nivel: 4, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00425", asignatura: "Ingeniería de Software", creditos: 6, nivel: 4, prereq: ["DCCB-00320"] },
  { codigo: "DCCB-00440", asignatura: "Estadística", creditos: 5, nivel: 4, prereq: ["DAMA-00340"] },
];



export const sampleProgress: CourseProgress[] = [
  // NIVEL 1
  {
    nrc: "10001",
    period: "202320",
    student: "333333333",
    course: "DCCB-00107", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "APROBADO",
  },
  {
    nrc: "10002",
    period: "202320",
    student: "333333333",
    course: "DCCB-00106", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "REPROBADO",
  },
  {
    nrc: "10003",
    period: "202120",
    student: "333333333",
    course: "DDOC-00102",
    excluded: false,
    inscriptionType: "REGULAR",
    status: "APROBADO",
  },

  // NIVEL 2
  {
    nrc: "20001",
    period: "202430",
    student: "333333333",
    course: "DCCB-00210", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "CURSANDO",
  },
  {
    nrc: "20002",
    period: "202430",
    student: "333333333",
    course: "SSED-00102", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "APROBADO",
  },
  {
    nrc: "20003",
    period: "202430",
    student: "333333333",
    course: "DAMA-00235", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "CURSANDO",
  },

  // NIVEL 3
  {
    nrc: "30001",
    period: "202430",
    student: "333333333",
    course: "DCCB-00320", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "DISPONIBLE PROXIMO SEMESTRE",
  },
  {
    nrc: "30002",
    period: "202430",
    student: "333333333",
    course: "DCCB-00330", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "DISPONIBLE PROXIMO SEMESTRE",
  },
  {
    nrc: "30003",
    period: "202430",
    student: "333333333",
    course: "DAMA-00340", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "REPROBADO",
  },

  // NIVEL 4
  {
    nrc: "40001",
    period: "",
    student: "333333333",
    course: "DCCB-00415", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "DISPONIBLE",
  },
  {
    nrc: "40002",
    period: "",
    student: "333333333",
    course: "DCCB-00425", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "DISPONIBLE",
  },
  {
    nrc: "40003",
    period: "",
    student: "333333333",
    course: "DCCB-00440", 
    excluded: false,
    inscriptionType: "REGULAR",
    status: "DISPONIBLE PROXIMO SEMESTRE",
  },
];


// -----------------------------------------
// Determinar estado de cada curso
// -----------------------------------------

type CourseStatus =
  | "completed"
  | "failed"
  | "in-progress"
  | "available-next-semester"
  | "not-started";

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
    return "available-next-semester";
  }

  return "not-started";
}

// -----------------------------------------
// Componente principal
// -----------------------------------------

export default function CurriculumPage() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  const carreras =
    state.carreras && state.carreras.length > 0 ? state.carreras : defaultCareers;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Career>(carreras[0]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [progressData] = useState<CourseProgress[]>(sampleProgress);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 400);
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

  const closeCourseModal = () => {
    setSelectedCourse(null);
  };

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
                <article key={num} className={styles.column}>
                  <h2 className={styles.semTitle}>Nivel {num}</h2>
                  <div className={styles.courseList}>
                    {cursos.map((c) => {
                      const status = getCourseStatus(c, progressData);

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
          onClose={() => setSelectedCourse(null)}
        />
      )}
      <div className={styles.projectionButtons}>
        <Button variant="green">Crear Proyección</Button>
        <Button variant="blue">Guardar Proyección</Button>
      </div>
    </div>
  );
}
