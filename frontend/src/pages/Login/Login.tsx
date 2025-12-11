import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { sampleStudents } from "../../data/sampleData";
import type { Student } from "../../types/Student";
import { useUser } from "../../context/UserContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [students, setStudents] = useState<Student[]>([]); // data cargada
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();


  useEffect(() => {
    async function loadUsers() {
      try {
        // Una vez este listo el back:
        // const res = await axios.get("/auth/users");
        // setStudents(res.data);


        // Por ahora: usar sampleData
        setStudents(sampleStudents); //cambiar por data real
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      }
    }

    loadUsers();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Buscar usuario por email
    const user = students.find((u) => u.email === email);

    if (!user || password.trim() === "") {
      setError("Credenciales incorrectas");
      return;
    }

    setUser(user);

    // Redirección según cantidad de carreras
    if (user.carreras && user.carreras.length > 1) {
      const carrera = user.carreras[0];
      navigate(`/malla/${user.id}/${carrera.codigo}/${carrera.catalogo}`);
      return;
    }

    if (user.carreras && user.carreras.length === 1) {
      const carrera = user.carreras[0];
      navigate(`/malla/${user.id}/${carrera.codigo}/${carrera.catalogo}`);
      return;
    }

    setError("El usuario no tiene carreras asignadas");
  };

  return (
    <div className={styles.container}>

      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Malla UCN</h1>
        <div className={styles.titleBar}></div>
      </div>

      <form
        className={styles.loginBox}
        onSubmit={handleLogin}
        aria-labelledby="login-title"
      >
        <h2 id="login-title">Iniciar sesión</h2>  
        <input
          type="email"
          placeholder="Correo electrónico"
          aria-label="Correo electrónico"
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "login-error" : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          aria-label="Contraseña"
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? "login-error" : undefined}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p
            id="login-error"
            className={styles.error}
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <Button variant="green" type="submit">
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default Login;