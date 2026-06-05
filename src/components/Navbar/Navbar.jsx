import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({onToggleMenu}) {
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

          {/* CENTRO: Logo de la Librería con Link para volver al Home */}
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 style={{
                    margin: 0,
                    fontFamily: '"Playfair Display", "Georgia", serif', // Tipografía Serif elegante
                    fontSize: '1.6rem',
                    fontWeight: '500',
                    color: '#2c1810', // Tono marrón muy oscuro literario
                    letterSpacing: '0.5px'
                }}>
                    Librería Albatros
                </h1>
            </Link>

            {/* DERECHA: Utilidades (Buscador, Usuario, Carrito) */}
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

                {/* Perfil del Usuario (Link temporal a /admin para poder entrar a probar) */}
                <Link to="/admin" style={{ 
                    textDecoration: 'none', 
                    color: '#1a1a1a', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    fontWeight: '500'
                }}>
                    <span>👤</span>
                    <span style={{ borderBottom: '1px solid transparent' }}>tomas.barone</span>
                </Link>

                {/* Icono Carrito */}
                <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>💼</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>Carrito</span>
                </div>
            </div>

        </header>
    )
}

export default Navbar;