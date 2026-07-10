import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importamos tu nuevo contexto

function Navbar({ onToggleMenu }) {
    // Extraemos el usuario dinámico y la función de logout directamente del Contexto Global
    const { user, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '18px 40px',
            backgroundColor: '#f9f6f0',
            borderBottom: '1px solid #e8e2d5',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            
            {/* IZQUIERDA: Botón de Menú */}
            <div onClick={onToggleMenu} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.2rem', color: '#1a1a1a' }}>☰</span>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#1a1a1a' }}>
                    Menú
                </span>
            </div>

            {/* CENTRO: Logo de la Librería */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 style={{
                    margin: 0,
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    fontSize: '1.6rem',
                    fontWeight: '500',
                    color: '#2c1810',
                    letterSpacing: '0.5px'
                }}>
                    Librería Albatros
                </h1>
            </Link>

            {/* DERECHA: Utilidades */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '24px', 
                color: '#1a1a1a',
                fontSize: '0.9rem',
                fontFamily: 'system-ui, sans-serif'
            }}>
                {/* Icono Buscador */}
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.1rem' }}>⌕</span>
                </div>

                {/* Perfil del Usuario Adaptativo basado en Context */}
                {user ? (
                    /* --- VISTA CUANDO EL USUARIO ESTÁ LOGEADO --- */
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Link to="/admin" style={{ 
                            textDecoration: 'none', 
                            color: '#2c1810', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            fontWeight: '600'
                        }}>
                            <span>👤</span>
                            {/* Mostramos el sub/username decodificado del JWT en el Context */}
                            <span style={{ borderBottom: '1px solid #2c1810' }}>{user.sub || user.username}</span>
                        </Link>
                        
                        <button 
                            onClick={handleLogout}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#ef4444',
                                border: '1px solid #fde8ec',
                                borderRadius: '4px',
                                padding: '4px 8px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Salir
                        </button>
                    </div>
                ) : (
                    /* --- VISTA CUANDO NO HAY SESIÓN ACTIVA --- */
                    <Link to="/login" style={{ 
                        textDecoration: 'none', 
                        color: '#6e6355', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        fontWeight: '500'
                    }}>
                        <span>👤</span>
                        <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Ingresar
                        </span>
                    </Link>
                )}

                {/* Icono Carrito */}
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>💼</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Carrito</span>
                </div>
            </div>

        </header>
    );
}

export default Navbar;