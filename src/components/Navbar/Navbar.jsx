import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

function Navbar({ onToggleMenu }) {
    const { user, cerrarSesion } = useAuth();
    const navigate = useNavigate();
    
    // Estado para controlar cuándo el mouse está sobre la zona de perfil
    const [isHovered, setIsHovered] = useState(false);

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

                {/* Perfil del Usuario Adaptativo Estilo HBO Max */}
                {user ? (
                    /* --- CONTENEDOR PADRE DEL DESPLEGABLE --- */
                    <div 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{ 
                            position: 'relative', 
                            display: 'flex', 
                            alignItems: 'center',
                            padding: '10px 0', /* Zona segura para el mouse */
                            cursor: 'pointer'
                        }}
                    >
                        {/* El disparador visual (Avatar e Inicial) */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontWeight: '600',
                            color: '#2c1810'
                        }}>
                            <span>👤</span>
                            <span style={{ borderBottom: '1px solid #2c1810' }}>
                                {user.sub || user.username}
                            </span>
                            <span style={{ fontSize: '0.7rem', marginLeft: '2px' }}>▾</span>
                        </div>

                        {/* --- EL MENÚ DESPLEGABLE FLOTANTE --- */}
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            backgroundColor: '#ffffff',
                            border: '1px solid #e8e2d5',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            borderRadius: '4px',
                            padding: '12px 0',
                            minWidth: '180px',
                            zIndex: 2000,
                            // Magia de transiciones usando el estado de React
                            display: isHovered ? 'block' : 'none',
                        }}>
                            {/* Info rápida de cuenta */}
                            <div style={{ padding: '4px 16px', fontSize: '0.8rem', color: '#6e6355' }}>
                                Cuenta de {user.sub || user.username}
                            </div>
                            
                            <hr style={{ border: 0, height: '1px', backgroundColor: '#e8e2d5', margin: '8px 0' }} />
                            
                            {/* Acciones */}
                            <Link to="/admin" style={{ 
                                display: 'block', 
                                padding: '8px 16px', 
                                color: '#2c1810', 
                                textDecoration: 'none',
                                fontSize: '0.85rem'
                            }}>
                                Panel de Control
                            </Link>
                            
                            <Link to="/mis-compras" style={{ 
                                display: 'block', 
                                padding: '8px 16px', 
                                color: '#2c1810', 
                                textDecoration: 'none',
                                fontSize: '0.85rem'
                            }}>
                                Mis Compras
                            </Link>

                            <button 
                                onClick={handleLogout}
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    textAlign: 'left',
                                    backgroundColor: 'transparent',
                                    color: '#ef4444',
                                    border: 'none',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    fontFamily: 'inherit'
                                }}
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                ) : (
                    /* --- VISTA CUANDO NO HAY SESIÓN ACTIVA (Queda idéntica a la tuya) --- */
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