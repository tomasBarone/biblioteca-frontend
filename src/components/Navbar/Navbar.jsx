import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const actualizarContador = () => {
            const pendientes = JSON.parse(localStorage.getItem('reservas_pendientes')) || [];
            const total = pendientes.reduce((acc, item) => acc + (item.cantidad || 1), 0);
            setCantidadReservas(total);
        };

        actualizarContador();

        window.addEventListener('storage', actualizarContador);
        window.addEventListener('reservas_updated', actualizarContador);

        return () => {
            window.removeEventListener('storage', actualizarContador);
            window.removeEventListener('reservas_updated', actualizarContador);
        };
    }, []);

    return (
        <>
            <header className="navbar-header">
                {/* IZQUIERDA: Menú de Navegación de Catálogo y Corrientes */}
                <div onClick={onToggleMenu} className="navbar-menu-trigger">
                    <span className="navbar-menu-icon">☰</span>
                    <span className="navbar-menu-text">Menú</span>
                </div>

                {/* CENTRO: Marca Editorial */}
                <Link to="/" className="navbar-logo-link">
                    <h1 className="navbar-logo-title">Infinita Deriva</h1>
                </Link>

                {/* DERECHA: Búsqueda + Disparador de Ficha de Socio */}
                <div className="navbar-utils-inline">
                    {/* Lupa / Buscador rápido */}
                    <button onClick={() => setSearchOpen(true)} className="nav-text-link" title="Buscar en el catálogo">
                        BUSCAR
                    </button>

                    <span className="nav-sep">|</span>

                    {/* Disparador del Overlay de Socio */}
                    {user ? (
                        <button 
                            onClick={() => setUserMenuOpen(true)} 
                            className="nav-text-link socio-trigger"
                            title="Abrir Ficha de Socio"
                        >
                            SOCIO: {user.sub || user.username} {cantidadReservas > 0 ? `(${cantidadReservas})` : ''} ▾
                        </button>
                    ) : (
                        <Link to="/login" className="nav-text-link">
                            INGRESAR
                        </Link>
                    )}
                </div>
            </header>

            {/* Overlays */}
            <SearchOverlay 
                isOpen={searchOpen} 
                onClose={() => setSearchOpen(false)} 
            />

            <UserMenuOverlay 
                isOpen={userMenuOpen} 
                onClose={() => setUserMenuOpen(false)} 
            />
        </>
    );
}

export default Navbar;