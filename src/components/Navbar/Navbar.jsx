import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 
import SearchOverlay from '../SearchOverlay/SearchOverlay';
import UserMenuOverlay from '../UserMenu/UserMenuOverlay';
import './Navbar.css';

function Navbar({ onToggleMenu }) {
    const { user } = useAuth();
    const [searchOpen, setSearchOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [cantidadReservas, setCantidadReservas] = useState(0);
    
    // Estado del menú activo
    const [menuAbierto, setMenuAbierto] = useState(null);
    const navRef = useRef(null);

    useEffect(() => {
        const actualizarContador = () => {
            const pendientes = JSON.parse(localStorage.getItem('reservas_pendientes')) || [];
            const total = pendientes.reduce((acc, item) => acc + (item.cantidad || 1), 0);
            setCantidadReservas(total);
        };

        actualizarContador();
        window.addEventListener('storage', actualizarContador);
        window.addEventListener('reservas_updated', actualizarContador);

        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setMenuAbierto(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('storage', actualizarContador);
            window.removeEventListener('reservas_updated', actualizarContador);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleToggleMenu = (menuName) => {
        setMenuAbierto(prev => (prev === menuName ? null : menuName));
    };

    return (
        <div ref={navRef} className="navbar-wrapper">
            <header className="navbar-header">
                {/* IZQUIERDA: Menú de Corrientes (Intacto) */}
                <div onClick={onToggleMenu} className="navbar-menu-trigger">
                    <span className="navbar-menu-icon">☰</span>
                    <span className="navbar-menu-text">MENÚ</span>
                </div>

                {/* CENTRO: Marca Editorial */}
                <Link to="/" className="navbar-logo-link" onClick={() => setMenuAbierto(null)}>
                    <h1 className="navbar-logo-title">Infinita Deriva</h1>
                    <h3 className="navbar-logo-subtitle">Una biblioteca para lectores curiosos</h3>
                </Link>

                {/* DERECHA: Opciones Institucionales */}
                <div className="navbar-utils-inline">
                    
                    <div className="nav-dropdown-container">
                        <button 
                            type="button" 
                            className={`nav-text-btn ${menuAbierto === 'salas' ? 'active' : ''}`}
                            onClick={() => handleToggleMenu('salas')}
                        >
                            Salas & Sede {menuAbierto === 'salas' ? '∧' : '∨'}
                        </button>
                    </div>

                    <div className="nav-dropdown-container">
                        <button 
                            type="button" 
                            className={`nav-text-btn ${menuAbierto === 'pase' ? 'active' : ''}`}
                            onClick={() => handleToggleMenu('pase')}
                        >
                            Pase Lector {menuAbierto === 'pase' ? '∧' : '∨'}
                        </button>
                    </div>

                    <span className="nav-sep">|</span>

                    <button 
                        type="button" 
                        onClick={() => { setSearchOpen(true); setMenuAbierto(null); }} 
                        className="nav-text-btn"
                    >
                        BUSCAR
                    </button>

                    <span className="nav-sep">|</span>

                    {user ? (
                        <button 
                            type="button"
                            onClick={() => { setUserMenuOpen(true); setMenuAbierto(null); }} 
                            className="nav-text-btn socio-trigger"
                        >
                            SOCIO: {user.sub || user.username} {cantidadReservas > 0 ? `(${cantidadReservas})` : ''} ▾
                        </button>
                    ) : (
                        <Link to="/login" className="nav-text-btn socio-trigger" onClick={() => setMenuAbierto(null)}>
                            ACCESO SOCIO
                        </Link>
                    )}
                </div>
            </header>

            {/* --- TELÓN Y DRAWER PERMANENTE MIENTRAS HAYA UN MENÚ ABIERTO --- */}
            {menuAbierto && (
                <>
                    <div className="dropdown-overlay-backdrop" onClick={() => setMenuAbierto(null)} />

                    <div className="dropdown-drawer-panel">
                        {/* El contenido intercambia dentro del mismo panel estático sin re-animar el contenedor */}
                        {menuAbierto === 'salas' && (
                            <div className="drawer-content-inner fade-in-content">
                                <div className="drawer-main-col">
                                    <h3>Salas de Lectura & Sede San Isidro</h3>
                                    <p className="drawer-lead">Espacios silenciosos de estudio e investigación académica dotados de luz focal y consulta en sala.</p>
                                    <div className="drawer-links-grid">
                                        <Link to="/salas" onClick={() => setMenuAbierto(null)}>Salas Generales de Lectura</Link>
                                        <Link to="/salas" onClick={() => setMenuAbierto(null)}>Mesas de Investigación Silenciosa</Link>
                                        <Link to="/salas" onClick={() => setMenuAbierto(null)}>Gabinete y Café de Lectores</Link>
                                        <Link to="/salas" onClick={() => setMenuAbierto(null)}>Horarios y Ubicación de Sede</Link>
                                    </div>
                                </div>
                                <div className="drawer-side-col">
                                    <h4>Atención Presencial</h4>
                                    <p>Lunes a Viernes de 09:00 a 19:00 hs. Acceso libre con Ficha de Socio activa.</p>
                                </div>
                            </div>
                        )}

                        {menuAbierto === 'pase' && (
                            <div className="drawer-content-inner fade-in-content">
                                <div className="drawer-main-col">
                                    <h3>Pase Lector y Acreditación</h3>
                                    <p className="drawer-lead">La credencial oficial que otorga derechos de préstamo domiciliario y reserva de puestos de estudio.</p>
                                    <div className="drawer-links-grid">
                                        <Link to="/pase-lector" onClick={() => setMenuAbierto(null)}>¿Cómo obtener el Pase Lector?</Link>
                                        <Link to="/pase-lector" onClick={() => setMenuAbierto(null)}>Reglamento de Préstamos (14 Días)</Link>
                                        <Link to="/pase-lector" onClick={() => setMenuAbierto(null)}>Acceso a Fondos y Manuscritos Raros</Link>
                                    </div>
                                </div>
                                <div className="drawer-side-col">
                                    <h4>Membresía</h4>
                                    <p>Gestiona tu legajo de lector y consulta tus ejemplares en posesión desde tu perfil.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}

            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <UserMenuOverlay isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
        </div>
    );
}

export default Navbar;