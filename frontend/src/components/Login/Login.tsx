import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import type { Carrera } from "../../types/Carrera";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    //BORRAR DESPUES
    //Simulación temporal (mock)
    //En el futuro esto vendrá del backend
    const mockUsers = {
      "juan@example.com": {
        rut: "11111111-1",
        carreras: [{ codigo: "8266", nombre: "ITI", catalogo: "202410" }],
      },
      "maria@example.com": {
        rut: "22222222-2",
        carreras: [
          { codigo: "8266", nombre: "ITI", catalogo: "202410" },
          { codigo: "8606", nombre: "ICCI", catalogo: "201610" },
        ],
      },
    };

    const user = (mockUsers as any)[email];

    //CAMBIAR O BORRAR HASTA AQUI

    if (!user || password.trim() === "") {
      setError("Credenciales incorrectas");
      return;
    }

    // 🔀 Redirección según cantidad de carreras
    if (user.carreras.length > 1) {
      navigate("/seleccion-carrera", { state: user });
    } else {
      const carrera = user.carreras[0];
      navigate(`/malla/${user.rut}/${carrera.codigo}/${carrera.catalogo}`);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.loginBox} onSubmit={handleLogin}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
