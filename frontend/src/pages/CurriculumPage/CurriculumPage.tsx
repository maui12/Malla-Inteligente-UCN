import React, { useEffect, useState } from "react";
import { fetchCourses } from "../../services/api";
import type { Course } from "../../types/course";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
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

  // si el login no pasó carreras, usamos el mock local de carreras
  const carreras = state.carreras && state.carreras.length > 0 ? state.carreras : defaultCareers;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState<Carrera>(carreras[0]);

  useEffect(() => {
    setLoading(true);
    // fetchCourses viene de services/api.ts (datos centralizados)
    fetchCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        console.error("Error cargando cursos:", err);
        setCourses([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Recalcula semestres a partir de courses (agrupando por course.semester)
  const semestres = courses.reduce<Record<number, Course[]>>((acc, c) => {
    if (!acc[c.semester]) acc[c.semester] = [];
    acc[c.semester].push(c);
    return acc;
  }, {});

  // Mapa de estilos por estado (clase CSS)
  const statusClass = (status: string) => {
    switch (status) {
      case "approved":
        return styles.approved;
      case "failed":
        return styles.failed;
      case "projected":
        return styles.projected;
      case "planned":
        return styles.planned;
      default:
        return styles.neutral;
    }
  };

  // Al cambiar de carrera (simulación): por ahora solo actualiza el título y cierra modal.
  // Si en el futuro quieres que fetchCourses devuelva datos por carrera, aquí llamas a fetchCourses(codigo).
  const handleSelectCareer = (c: Carrera) => {
    setSelectedCareer(c);
    setModalOpen(false);
    // posible lugar para recargar cursos: fetchCoursesForCareer(c.codigo) si lo implementas en services/api.ts
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Malla Curricular</h1>
          <div className={styles.sub}>
            <span className={styles.carreraName}>{selectedCareer.nombre}</span>{" "}
            <span className={styles.catalogo}>(Catálogo {selectedCareer.catalogo})</span>
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
          {Object.keys(semestres)
            .sort((a, b) => Number(a) - Number(b))
            .map((num) => {
              const cursos = semestres[Number(num)];
              return (
                <article key={num} className={styles.column}>
                  <h2 className={styles.semTitle}>Semestre {num}</h2>
                  <div className={styles.courseList}>
                    {cursos.map((c) => (
                      <div key={c.id} className={`${styles.card} ${statusClass(c.status)}`}>
                        <div className={styles.courseName}>{c.name}</div>
                        <div className={styles.meta}>
                          <span>{c.creditos ?? ""}</span>
                          <span className={styles.year}>{c.year}</span>
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
    </div>
  );
}
