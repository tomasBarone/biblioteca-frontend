import React from 'react';
import { Link } from 'react-router-dom';
import './MenuOverlay.css'; 

// Recibimos isOpen y onClose directamente desde App.jsx
function MenuOverlay({ isOpen, onClose }) {
    return (
        <>
            {/* 
               Eliminamos la etiqueta <nav className="navbar-fija"> de antes, 
               porque tu nuevo encabezado minimalista ya cumple esa función.
            */}

            {/* El telón ahora se abre o cierra según la prop 'isOpen' */}
            <div className={`fullscreen-overlay ${isOpen ? 'open' : ''}`}>
                
                {/* Botón de cerrar (X) dentro del menú desplegado */}
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                
                {/* Enlaces de las corrientes literarias de tu mockup */}
                <div className="overlay-links">
                    <Link to="/" onClick={onClose}>Clasicismo</Link>
                    <Link to="/" onClick={onClose}>Barroco</Link>
                    <Link to="/" onClick={onClose}>Romanticismo</Link>
                    <Link to="/" onClick={onClose}>Realismo</Link>
                    
                    {/* Un acceso directo administrativo dentro del menú viene bárbaro */}
                    <Link to="/admin" onClick={onClose} style={{ marginTop: '20px', color: '#f38ba8', fontSize: '1.2rem' }}>
                        ⚙️ Administración
                    </Link>
                </div>
            </div>
        </>
    );
}

export default MenuOverlay;