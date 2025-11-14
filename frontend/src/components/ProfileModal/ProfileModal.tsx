import React from "react";
import styles from "./ProfileModal.module.css";
import type { Carrera } from "../../types/Career";

interface Props {
  carreras: Carrera[];
  selectedCareer: Carrera;
  onSelectCareer: (c: Carrera) => void;
  onClose: () => void;
}

export default function ProfileModal({ carreras, selectedCareer, onSelectCareer, onClose }: Props) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Perfil del estudiante</h3>

        <label className={styles.label}>Carrera seleccionada:</label>
        <select
          className={styles.select}
          value={selectedCareer.codigo}
          onChange={(e) => {
            const nueva = carreras.find((c) => c.codigo === e.target.value);
            if (nueva) onSelectCareer(nueva);
          }}
        >
          {carreras.map((c) => (
            <option key={c.codigo} value={c.codigo}>
              {c.nombre} — {c.catalogo}
            </option>
          ))}
        </select>

        <div className={styles.actions}>
          <button className={styles.btnClose} onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
