import React from "react";
import styles from "./Header.module.css";
import { useTheme } from "../../context/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div>
          <h2>¡Bienvenido, Estudiante!</h2>
          <h3>Ingeniería Civil en Computación e Informática</h3>
          <p>Situación actual</p>
        </div>

        <button className={styles.themeButton} onClick={toggleTheme}>
          {theme === "light" ? "🌙 Modo oscuro" : "☀️ Modo claro"}
        </button>
      </div>
    </header>
  );
};

export default Header;
