import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserMenuOverlay.css';

function UserMenuOverlay({ isOpen, onClose }) {
  const { user, cerrarSesion } = useAuth();
  const navigate = useNavigate();



  const handleLogout = () => {
    cerrarSesion();
    onClose();
    navigate('/login');
  };

  const reservasPendientes = JSON.parse(localStorage.getItem('reservas_pendientes')) || [];
  const totalReservas = reservasPendientes.reduce((acc, r) => acc + (r.cantidad || 1), 0);

  return (
    <div className={`user-menu-overlay ${isOpen ? 'is-open' : ''}`}>
      
      {/* CABECERA CON LOGO A LA IZQUIERDA */}
      <header className="user-overlay-header">
        <span className="user-overlay-logo">Infinita Deriva</span>
        <button className="user-overlay-close-btn" onClick={onClose}>
          CERRAR <span>×</span>
        </button>
      </header>

      {/* CUERPO EN 2 COLUMNAS EDITORIALES */}
      <div className="user-overlay-body">
        
        {/* COLUMNA IZQUIERDA: DATOS DEL SOCIO */}
        <div className="user-col-left">
          <span className="user-overlay-subtitle">REGISTRO DE SOCIO & LECTOR</span>
          <h2 className="user-overlay-name">{user?.sub || user?.username || 'Lector'}</h2>
          <span className="user-overlay-id">FICHA N° {user?.id || '0042'}</span>
        </div>

        {/* COLUMNA DERECHA: MENÚ Y NAVEGACIÓN */}
        <div className="user-col-right">
          <nav className="user-overlay-nav">
            
            <div className="user-overlay-item">
              <Link to="/reservas" onClick={onClose} className="user-overlay-link">
                Solicitudes de Préstamo
              </Link>
              <span className="user-overlay-meta">
                {totalReservas > 0 ? `${totalReservas} OBRAS RESERVADAS` : 'SIN RESERVAS ACTIVAS'}
              </span>
            </div>

            <div className="user-overlay-item">
              <Link to="/biblioteca" onClick={onClose} className="user-overlay-link">
                Cuaderno de Lecturas
              </Link>
              <span className="user-overlay-meta">ANOTACIONES Y TÍTULOS GUARDADOS</span>
            </div>

            {user?.roles?.includes('ROLE_ADMIN') && (
              <div className="user-overlay-item">
                <Link to="/admin" onClick={onClose} className="user-overlay-link admin">
                  Panel de Gestión Académica
                </Link>
                <span className="user-overlay-meta admin-meta">ADMINISTRACIÓN Y CATÁLOGO</span>
              </div>
            )}

          </nav>

          {/* CERRAR SESIÓN */}
          <footer className="user-overlay-footer">
            <button onClick={handleLogout} className="user-overlay-logout-btn">
              CERRAR SESIÓN ACTIVA <span>→</span>
            </button>
          </footer>
        </div>

      </div>
    </div>
  );
}

export default UserMenuOverlay;