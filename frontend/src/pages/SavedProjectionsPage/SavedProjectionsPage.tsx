import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../../components/Buttons/Button';
import styles from './SavedProjectionsPage.module.css';

interface SavedProjection {
  id: string;
  name: string;
  createdAt: string;
  data: any;
}

export default function SavedProjectionsPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  
  const [projections, setProjections] = useState<SavedProjection[]>([]);
  const [selectedProjection, setSelectedProjection] = useState<SavedProjection | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProjections = async () => {
      if (!user?.rut) return;
      try {
        const res = await axios.get(`http://localhost:3000/projection/student/${user.rut}`);
        setProjections(res.data);
      } catch (error) {
        console.error("Error cargando proyecciones:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjections();
  }, [user]);


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Button variant="blue" onClick={() => selectedProjection ? setSelectedProjection(null) : navigate(-1)}>
          {selectedProjection ? "Volver a la lista" : "Volver al Currículum"}
        </Button>
        <h1 className={styles.title}>Mis Proyecciones Guardadas</h1>
      </header>

      {loading ? (
        <div className={styles.loading}>Cargando historial...</div>
      ) : selectedProjection ? (
        <div className={styles.detailView}>
          <div className={styles.detailHeader}>
            <h2>{selectedProjection.name}</h2>
          </div>

          <div className={styles.timelineContainer}>
            <div className={styles.timelineTrack}>
              {selectedProjection.data.fullPlan.map((sem: any, idx: number) => (
                <div key={idx} className={styles.semesterCard}>
                  <div className={styles.semHeader}>
                    <h4>{sem.period} {sem.year}</h4>
                    <span className={styles.credits}>{sem.totalCredits} SCT</span>
                  </div>
                  <div className={styles.courseList}>
                    {sem.courses.map((code: string) => (
                      <div key={code} className={styles.courseItem}>
                        {code}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // --- VISTA DE LISTA ---
        <div className={styles.grid}>
          {projections.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tienes proyecciones guardadas aún.</p>
            </div>
          ) : (
            projections.map((proj) => (
              <div key={proj.id} className={styles.card} onClick={() => setSelectedProjection(proj)}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{proj.name}</h3>
                  <p className={styles.cardSummary}>
                    Graduación estimada: <strong>{proj.data.estimatedGraduation}</strong>
                  </p>
                </div>
                <div className={styles.cardArrow}>→</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}