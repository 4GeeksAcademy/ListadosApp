import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

// Un botón simple para login
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button 
      onClick={() => loginWithRedirect()}
      className="btn btn-primary"
      style={{ fontSize: "1.2rem", padding: "0.5rem 1rem" }}
    >
      Iniciar Sesión
    </button>
  );
};

export const Login = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Si el usuario ya está autenticado, redirige al Home
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return <div className="text-center" style={{marginTop:"50px"}}>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div 
        className="login-overlay d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: "9999"
        }}
      >
        <div 
          className="login-modal card p-4"
          style={{
            maxWidth: "400px",
            width: "90%",
            textAlign: "center",
            background: "#fff",
            borderRadius: "8px"
          }}
        >
          <h2 style={{marginBottom:"1rem"}}>Acceso requerido</h2>
          <p style={{marginBottom:"1.5rem"}}>
            Debes iniciar sesión o registrarte con tu cuenta de Google/GitHub para continuar.
          </p>
          <LoginButton />
        </div>
      </div>
    );
  }

  // Si está autenticado, la lógica del useEffect ya redireccionó al Home
  return null;
};
