import React, { useState } from "react";
import styles from "./CreateProjectionPage.module.css";
import Button from "../../components/Buttons/Button";

type ProjectionMode = "manual" | "automatic";
type Semester = "regular" | "winter" | "summer";

interface ProjectionSettings {
  mode: ProjectionMode;
  maxCoursesPerSemester: number;
  maxCreditsPerSemester: number;
  allowAdvancedCourses: boolean;
  includeSummerWinter: boolean;
  autoBalanceSemesters: boolean;
}

export default function CreateProjectionPage() {
  const [mode, setMode] = useState<ProjectionMode>("manual");
  const [settings, setSettings] = useState<ProjectionSettings>({
    mode: "manual",
    maxCoursesPerSemester: 6,
    maxCreditsPerSemester: 50,
    allowAdvancedCourses: true,
    includeSummerWinter: false,
    autoBalanceSemesters: true,
  });

  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  const handleModeChange = (newMode: ProjectionMode) => {
    setMode(newMode);
    setSettings({ ...settings, mode: newMode });
  };

  const handleCreateProjection = () => {
    console.log("Creando proyección con configuración:", settings);
    // TODO: Implementar lógica de creación
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Crear Proyección Académica</h1>
          <p className={styles.subtitle}>
            Planifica tu ruta académica hasta completar tu carrera
          </p>
        </div>
      </header>

      <div className={styles.content}>
        {/* Selector de Modo */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Modo de Proyección</h2>
          <div className={styles.modeSelector}>
            <button
              className={`${styles.modeButton} ${
                mode === "manual" ? styles.modeButtonActive : ""
              }`}
              onClick={() => handleModeChange("manual")}
            >
              <div className={styles.modeIcon}>✋</div>
              <div className={styles.modeLabel}>Manual</div>
              <div className={styles.modeDescription}>
                Tú eliges los cursos para cada semestre
              </div>
            </button>

            <button
              className={`${styles.modeButton} ${
                mode === "automatic" ? styles.modeButtonActive : ""
              }`}
              onClick={() => handleModeChange("automatic")}
            >
              <div className={styles.modeIcon}>🤖</div>
              <div className={styles.modeLabel}>Automático</div>
              <div className={styles.modeDescription}>
                El sistema optimiza tu malla automáticamente
              </div>
            </button>
          </div>
        </section>

        {/* Configuración Básica */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Configuración Básica</h2>
          <div className={styles.settingsGrid}>
            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                Cursos máximos por semestre
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.maxCoursesPerSemester}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxCoursesPerSemester: parseInt(e.target.value),
                  })
                }
                className={styles.numberInput}
              />
            </div>

            <div className={styles.settingItem}>
              <label className={styles.settingLabel}>
                Créditos máximos por semestre
              </label>
              <input
                type="number"
                min="20"
                max="70"
                step="5"
                value={settings.maxCreditsPerSemester}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxCreditsPerSemester: parseInt(e.target.value),
                  })
                }
                className={styles.numberInput}
              />
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.includeSummerWinter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    includeSummerWinter: e.target.checked,
                  })
                }
                className={styles.checkbox}
              />
              <span>Incluir semestres de invierno y verano</span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={settings.allowAdvancedCourses}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    allowAdvancedCourses: e.target.checked,
                  })
                }
                className={styles.checkbox}
              />
              <span>Permitir adelantar cursos</span>
            </label>

            {mode === "automatic" && (
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={settings.autoBalanceSemesters}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoBalanceSemesters: e.target.checked,
                    })
                  }
                  className={styles.checkbox}
                />
                <span>Balancear carga automáticamente</span>
              </label>
            )}
          </div>
        </section>

        {/* Configuración Avanzada (Opcional) */}
        <section className={styles.section}>
          <button
            className={styles.toggleAdvanced}
            onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
          >
            {showAdvancedSettings ? "▼" : "▶"} Configuración Avanzada
          </button>

          {showAdvancedSettings && (
            <div className={styles.advancedSettings}>
              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>ℹ️</div>
                <div>
                  <p className={styles.infoBold}>Consideraciones de la proyección:</p>
                  <ul className={styles.infoList}>
                    <li>Se asume que aprobarás todos los cursos</li>
                    <li>No se consideran choques de horario ni calendario de pruebas</li>
                    <li>Los cursos de invierno/verano solo están disponibles si has reprobado</li>
                    <li>El sistema evitará semestres con muy pocos cursos</li>
                    {mode === "automatic" && (
                      <li>El modo automático busca la graduación más temprana posible</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className={styles.restrictionsBox}>
                <h3 className={styles.restrictionsTitle}>Restricciones del Sistema</h3>
                <div className={styles.restrictionsList}>
                  <div className={styles.restrictionItem}>
                    <span className={styles.restrictionLabel}>Créditos mínimos por semestre:</span>
                    <span className={styles.restrictionValue}>30 SCT</span>
                  </div>
                  <div className={styles.restrictionItem}>
                    <span className={styles.restrictionLabel}>Cursos mínimos por semestre:</span>
                    <span className={styles.restrictionValue}>3 cursos</span>
                  </div>
                  <div className={styles.restrictionItem}>
                    <span className={styles.restrictionLabel}>Cursos adelantables:</span>
                    <span className={styles.restrictionValue}>Hasta 2 niveles</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Resumen de Proyección */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Resumen</h2>
          <div className={styles.summaryCards}>
            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>📚</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryLabel}>Cursos Pendientes</div>
                <div className={styles.summaryValue}>42 cursos</div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>🎯</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryLabel}>Créditos Restantes</div>
                <div className={styles.summaryValue}>180 SCT</div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>📅</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryLabel}>Semestres Estimados</div>
                <div className={styles.summaryValue}>
                  {mode === "automatic" ? "6 semestres" : "Por definir"}
                </div>
              </div>
            </div>

            <div className={styles.summaryCard}>
              <div className={styles.summaryIcon}>🎓</div>
              <div className={styles.summaryContent}>
                <div className={styles.summaryLabel}>Graduación Estimada</div>
                <div className={styles.summaryValue}>
                  {mode === "automatic" ? "2026-2" : "Por definir"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Botones de Acción */}
        <div className={styles.actionButtons}>
          <Button variant="blue" onClick={() => window.history.back()}>
            Cancelar
          </Button>
          <Button variant="green" onClick={handleCreateProjection}>
            {mode === "manual" ? "Comenzar Proyección Manual" : "Generar Proyección Automática"}
          </Button>
        </div>
      </div>
    </div>
  );
}