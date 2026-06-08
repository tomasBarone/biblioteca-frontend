import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MenuOverlay.css';

function MenuOverlay({ isOpen, onClose }) {
  // Hardcodeamos los datos del modelo con sus respectivos libros para la previsualización
  const movimientosData = [
    {
      id: 1,
      nombre: "Barroco",
      epoca: "S. XVII",
      descripcion: "Ingenio, conceptismo y desengaño.",
      libros: [
        { titulo: "El Quijote", autor: "Miguel de Cervantes", ano: 1605 },
        { titulo: "La vida es sueño", autor: "Pedro Calderón de la Barca", ano: 1635 },
        { titulo: "Sueños y discursos", autor: "Francisco de Quevedo", ano: 1627 }
      ]
    },
    {
      id: 2,
      nombre: "Ilustración",
      epoca: "S. XVIII",
      descripcion: "Razón, sátira y enciclopedia.",
      libros: [
        { titulo: "Cándido", autor: "Voltaire", ano: 1759 },
        { titulo: "Cartas Marruecas", autor: "José Cadalso", ano: 1789 }
      ]
    },
    {
      id: 3,
      nombre: "Romanticismo",
      epoca: "1800 - 1850",
      descripcion: "Pasión, libertad y naturaleza.",
      libros: [
        { titulo: "Cumbres borrascosas", autor: "Emily Brontë", ano: 1847 },
        { titulo: "Don Álvaro o la fuerza del sino", autor: "Duque de Rivas", ano: 1835 }
      ]
    },
    {
      id: 4,
      nombre: "Realismo",
      epoca: "1850 - 1900",
      descripcion: "La vida cotidiana sin adornos.",
      libros: [
        { titulo: "Fortunata y Jacinta", autor: "Benito Pérez Galdós", ano: 1887 },
        { titulo: "Madame Bovary", autor: "Gustave Flaubert", ano: 1857 }
      ]
    },
    {
      id: 5,
      nombre: "Modernismo",
      epoca: "1880 - 1920",
      descripcion: "Belleza, exotismo y musicalidad.",
      libros: [
        { titulo: "Azul...", autor: "Rubén Darío", ano: 1888 }
      ]
    },
    {
      id: 6,
      nombre: "Vanguardia",
      epoca: "1910 - 1940",
      descripcion: "Ruptura y experimentación.",
      libros: [
        { titulo: "Residencia en la Tierra", autor: "Pablo Neruda", ano: 1935 }
      ]
    },
    {
      id: 7,
      nombre: "Contemporáneo",
      epoca: "S. XX - XXI",
      descripcion: "Voces actuales del mundo.",
      libros: [
        { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", ano: 1967 }
      ]
    }
  ];

  // Estado para saber qué movimiento tiene el mouse encima (por defecto el primero: Barroco)
  const [movimientoActivo, setMovimientoActivo] = useState(movimientosData[0]);

  if (!isOpen) return null;

  return (
    <div className={`fullscreen-menu-overlay ${isOpen ? 'is-open' : ''}`}>
      
      {/* HEADER DEL MENU */}
      <header className="menu-overlay-header">
        <span className="menu-logo">Librería Albatros</span>
        <button className="menu-close-btn" onClick={onClose}>
          CERRAR <span>×</span>
        </button>
      </header>

      {/* CUERPO DEL MENU DIVIDIDO EN DOS COLUMNAS */}
      <div className="menu-overlay-body">
        
        {/* COLUMNA IZQUIERDA: Lista de Géneros Literarios */}
        <div className="menu-col-left">
          <span className="menu-section-subtitle">Géneros Literarios</span>
          <nav className="menu-nav-list">
            {movimientosData.map((mov) => (
              <div 
                key={mov.id}
                className={`menu-nav-item ${movimientoActivo.id === mov.id ? 'active' : ''}`}
                onMouseEnter={() => setMovimientoActivo(mov)} /* CORREGIDO: Ahora coincide exactamente con tu useState */
              >
                <Link to={`/movimiento/${mov.id}`} onClick={onClose} className="menu-nav-link">
                  {mov.nombre}
                </Link>
                <span className="menu-nav-year">{mov.epoca}</span>
              </div>
            ))}
          </nav>

          {/* FOOTER INTERNO DE LA COLUMNA IZQUIERDA */}
          <footer className="menu-col-footer-links">
            <Link to="/" onClick={onClose}>INICIO</Link>
            <Link to="/" onClick={onClose}>CATÁLOGO</Link>
            <Link to="/login" onClick={onClose}>MI CUENTA</Link>
            <Link to="/admin" onClick={onClose} style={{ color: '#f38ba8' }}>⚙️ ADMIN</Link>
          </footer>
        </div>

        {/* COLUMNA DERECHA: Previsualización de Libros Dinámica */}
        <div className="menu-col-right">
          <div className="preview-movement-info">
            <span className="preview-epoca">{movimientoActivo.epoca}</span>
            <h2 className="preview-nombre">{movimientoActivo.nombre}</h2>
            <p className="preview-descripcion">{movimientoActivo.descripcion}</p>
          </div>

          {/* LISTA DE LIBROS ASOCIADOS */}
          <div className="preview-books-list">
            {movimientoActivo.libros.map((libro, idx) => (
              <div key={idx} className="preview-book-row">
                <div className="book-row-left">
                  <h4 className="preview-book-title">{libro.titulo}</h4>
                  <p className="preview-book-meta">{libro.autor} · {libro.ano}</p>
                </div>
                <span className="book-row-arrow">↗</span>
              </div>
            ))}
          </div>

          {/* BOTÓN INFERIOR DE ACCIÓN GLOBAL */}
          <Link to={`/movimiento/${movimientoActivo.id}`} onClick={onClose} className="view-all-movement-btn">
            VER TODO {movimientoActivo.nombre.toUpperCase()} <span>↗</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default MenuOverlay;