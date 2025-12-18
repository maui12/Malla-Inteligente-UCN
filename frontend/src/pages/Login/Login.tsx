import React, { useState } from "react";
import styles from "./Login.module.css";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { authService } from "../../services/auth.services";
import type { LoginRequest } from "../../types/Auth";
import type { User } from "../../types/Auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credentials: LoginRequest = { email, password };
      
      const response = await authService.login(credentials) as any; // Usamos any temporalmente para saltar el bloqueo
      const userData = response.user as User;
      setUser(userData);

      // 1. Redirección para Administradores
      if (response.user.role === 'admin') {
        navigate('/admin/dashboard');
        return;
      }

      if (response.user.carreras && response.user.carreras.length > 0) {
        const carreraPrincipal = response.user.carreras[0];
        
        navigate(
          `/malla/${carreraPrincipal.codigo}/${carreraPrincipal.catalogo}`
        );
      } else {
        navigate('/malla/');
      }

    } catch (err: any) {
      console.error('Error en login:', err);
      
      // Manejo de errores basado en la respuesta del backend
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas o usuario no registrado');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Error al conectar con el servidor UCN. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
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
          disabled={loading}
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

        <Button variant="green" type="submit" disabled={loading}>
          {loading ? 'Validando con UCN...' : 'Ingresar'}
        </Button>
      </form>
    </div>
  );
};

export default Login;