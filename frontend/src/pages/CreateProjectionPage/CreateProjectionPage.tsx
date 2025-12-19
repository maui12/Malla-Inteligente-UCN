import React, { useState, useMemo } from "react";
import styles from "./CreateProjectionPage.module.css";
import Button from "../../components/Buttons/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";

type ProjectionMode = "manual" | "automatic";

interface ProjectionSettings {
  mode: ProjectionMode;
  maxCreditsPerSemester: number;
}

export default function CreateProjectionPage() {
  const { careerCode } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();

  const [settings, setSettings] = useState<ProjectionSettings>({
    mode: "automatic",
    maxCreditsPerSemester: 30,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectionResult, setProjectionResult] = useState<any>(null);

  const selectedCareer = useMemo(() => {
    return user?.carreras.find((c) => String(c.codigo) === String(careerCode));
  }, [user, careerCode]);

  const getCourseName = (code: string) => {
    const course = selectedCareer?.malla.find((m) => m.codigo === code);
    return course ? course.asignatura : code;
  };

  const handleModeChange = (newMode: ProjectionMode) => {
    setSettings({ ...settings, mode: newMode });
    setProjectionResult(null);
    setError(null);
  };

  const handleCreateProjection = async () => {

    if (!user?.rut || !careerCode) {
      setError("Falta información del estudiante o carrera.");
      return;
    }

    const currentCatalog = selectedCareer?.catalogo || "2020";

    setLoading(true);
    setError(null);
    setProjectionResult(null);

    try {
      console.log(`Solicitando proyección... Rut: ${user.rut}, Carrera: ${careerCode}, Catálogo: ${currentCatalog}`);

      const response = await axios.post('http://localhost:3000/projection/automatic', {
        studentId: user.rut,
        careerCode: careerCode,
        maxCredits: settings.maxCreditsPerSemester,
        catalogo: currentCatalog 
      });

      console.log("Proyección exitosa:", response.data);
      setProjectionResult(response.data);

    } catch (err: any) {
      console.error("Error al proyectar:", err);
      
      const serverMessage = err.response?.data?.message;
      const genericMessage = "No se pudo conectar con el servidor de simulación.";
      
      setError(serverMessage || genericMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProjection = async () => {
    if (!projectionResult) return;

    const name = prompt("Dale un nombre a esta proyección:", "Mi Plan A");
    if (!name) return;

    try {
      await axios.post('http://localhost:3000/projection/save', {
        studentId: user?.rut,
        careerCode: careerCode,
        name: name,
        data: projectionResult
      });
      
      alert("Proyección guardada exitosamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar la proyección");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button variant="blue" onClick={() => navigate(-1)} style={{ padding: '5px 10px', fontSize: '0.9rem' }}>
             ← Volver
          </Button>
          <div>
            <h1 className={styles.title}>Simulador de Avance</h1>
            <p className={styles.subtitle}>
              Visualiza tu camino hacia la titulación
            </p>
          </div>
        </div>
      </header>

      <div className={styles.content}>

        {/* 2. CONFIGURACIÓN (SLIDER) */}
        <section className={styles.section}>
          <div className={styles.settingsGrid}>
            <div className={styles.settingItem} style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <label className={styles.settingLabel}>Carga Máxima por Semestre</label>
                <span style={{ fontWeight: 'bold', color: '#2563eb' }}>{settings.maxCreditsPerSemester} SCT</span>
              </div>
              
              <input
                type="range"
                min="12"
                max="35"
                step="1"
                value={settings.maxCreditsPerSemester}
                onChange={(e) =>
                  setSettings({ ...settings, maxCreditsPerSemester: parseInt(e.target.value) })
                }
                className={styles.slider}
                style={{ width: "100%", cursor: 'pointer' }}
              />
              <small style={{ color: '#64748b' }}>
                Mueve el slider para ver cómo cambia tu fecha de graduación.
              </small>
            </div>
          </div>
        </section>

        {/* 3. BOTÓN DE ACCIÓN */}
        <div className={styles.actionButtons}>
          <Button 
            variant="green" 
            onClick={handleCreateProjection}
            disabled={loading}
            style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}
          >
            {loading ? "Calculando Ruta Óptima..." : "Generar Proyección"}
          </Button>
        </div>

        {/* 4. MENSAJES DE ERROR */}
        {error && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#fee2e2', 
            border: '1px solid #ef4444', 
            borderRadius: '8px',
            color: '#b91c1c',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* 5. RESULTADOS (TIMELINE) */}
        {projectionResult && (
          <section className={styles.section} style={{ marginTop: '30px', borderTop: '2px dashed #e2e8f0', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Tu Ruta Académica</h2>
              <Button 
                variant="blue" 
                onClick={handleSaveProjection}
                style={{ padding: '8px 15px' }}
              >
                Guardar esta Proyección
              </Button>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Graduación Estimada</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#059669' }}>
                  {projectionResult.estimatedGraduation}
                </div>
              </div>
            </div>
            
            <div className={styles.timelineContainer} style={{ overflowX: 'auto', paddingBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                {projectionResult.fullPlan.map((sem: any, index: number) => (
                  <div key={index} className={styles.semesterCard} style={{
                    minWidth: '240px',
                    maxWidth: '240px',
                    backgroundColor: '#fff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    padding: '15px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
                      <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1rem' }}>
                        {sem.period} {sem.year}
                      </h4>
                      <span style={{ 
                        display: 'inline-block', 
                        marginTop: '4px',
                        fontSize: '0.75rem', 
                        padding: '2px 8px', 
                        borderRadius: '999px', 
                        backgroundColor: sem.totalCredits > 30 ? '#fff7ed' : '#f0f9ff',
                        color: sem.totalCredits > 30 ? '#c2410c' : '#0369a1',
                        fontWeight: '600'
                      }}>
                        {sem.totalCredits} Créditos
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sem.courses.length > 0 ? (
                        sem.courses.map((courseCode: string) => (
                          <div key={courseCode} style={{
                            backgroundColor: '#f8fafc',
                            padding: '8px',
                            borderRadius: '6px',
                            borderLeft: '3px solid #3b82f6',
                            fontSize: '0.85rem'
                          }}>
                            <div style={{ fontWeight: '700', color: '#334155' }}>{courseCode}</div>
                            <div style={{ 
                              fontSize: '0.8em', 
                              color: '#64748b', 
                              whiteSpace: 'nowrap', 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis' 
                            }}>
                              {getCourseName(courseCode)}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ fontStyle: 'italic', color: '#94a3b8', fontSize: '0.8rem' }}>
                          Sin cursos asignados
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}