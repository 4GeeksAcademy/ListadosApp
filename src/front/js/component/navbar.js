// Navbar.jsx
import React from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../../styles/navbar.css"

export const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth0();
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg pastel-navbar shadow-sm">
            <div className="container">
                <Link to="/" className="navbar-brand pastel-brand">
                    ToDoList App
                </Link>

                <button 
                    className="navbar-toggler pastel-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item me-3">
                            <Link to="/demo" className="nav-link pastel-link">
                                Demo Context
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li className="nav-item">
                                <button 
                                    className="btn pastel-button"
                                    onClick={handleLoginClick}
                                >
                                    Iniciar Sesión
                                </button>
                            </li>
                        )}
                        {isAuthenticated && (
                            <>
                                <li className="nav-item d-flex align-items-center me-3">
                                    {user && user.picture && (
                                        <img 
                                            src={user.picture} 
                                            alt={user.name} 
                                            className="user-avatar"
                                        />
                                    )}
                                    <span className="ms-2 pastel-text">{user && user.name ? user.name : "Usuario"}</span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="btn pastel-button-outline"
                                        onClick={() => logout({ returnTo: window.location.origin })}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
