import React, { useState, useEffect } from 'react';
import bibliotecaService from '../../services/bibliotecaService';
import { useAuth } from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';   
import { toast } from 'react-toastify';

// Ícono SVG Máquina de Escribir para la versión de catálogo
const TypewriterIcon = ({ active = false, size = 15 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="2" y="12" width="20" height="9" rx="2" />
    <path d="M6 12V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v8" />
    <path d="M4 17h16" />
    <path d="M9 15v2" />
    <path d="M15 15v2" />
  </svg>
);

function BotonGuardarLectura({ libroId, guardadoInicial = false, variante = "icono", onToggleExitoso }) {
  const [guardado, setGuardado] = useState(guardadoInicial);
  const [cargando, setCargando] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

 
 

  useEffect(() => {
    let montado = true;
    const verificarEstado = async () => {
      if (!libroId) return;
      try {
        const estaGuardado = await bibliotecaService.checkEstaGuardado(libroId);
        if (montado) setGuardado(estaGuardado);
      } catch (error) {
        console.warn(`No se pudo verificar el estado del libro ${libroId}`, error);
      }
    };
    verificarEstado();
    return () => { montado = false; };
  }, [libroId]);

  const handleToggle = async (e) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  if (!user) {
    toast.info("Debes iniciar sesión para guardar lecturas.");
    navigate('/login');
    return;
  } 

  if (cargando) return;

  setCargando(true);
  try {
    const response = await bibliotecaService.toggleGuardado(libroId);
    let estadoNuevo = (response && typeof response.guardado === 'boolean') ? response.guardado : !guardado;
    setGuardado(estadoNuevo);

    if (onToggleExitoso) onToggleExitoso(libroId, estadoNuevo);
  } catch (error) {
    console.error("Error al alternar guardado:", error);
  } finally {
    setCargando(false);
  }
};

  // VARIANTE 1: BOTÓN DE TEXTO COMPLETO PARA DETALLE LIBRO
  if (variante === "texto") {
    return (
      <button
        onClick={handleToggle}
        disabled={cargando}
        style={{
          backgroundColor: guardado ? '#efebe0' : 'transparent',
          color: guardado ? '#2e7d32' : '#1a1917',
          border: `1px solid ${guardado ? '#2e7d32' : '#1a1917'}`,
          padding: '14px 28px',
          borderRadius: '30px',
          fontSize: '0.9rem',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          cursor: cargando ? 'wait' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.25s ease',
          opacity: cargando ? 0.7 : 1,
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}
      >
        {guardado ? (
          <>
            <span>✓</span> GUARDADO EN MIS LECTURAS
          </>
        ) : (
          <>
            <TypewriterIcon active={false} size={16} /> GUARDAR EN MIS LECTURAS
          </>
        )}
      </button>
    );
  }

  // VARIANTE 2: ÍCONO REDONDO PARA CATÁLOGOS / TARJETAS (Predeterminado)
  return (
    <button
      onClick={handleToggle}
      disabled={cargando}
      title={guardado ? "Quitar de mis lecturas" : "Guardar en mis lecturas"}
      className={`btn-maquina-escribir ${guardado ? 'guardado' : ''}`}
      style={{
        opacity: cargando ? 0.6 : 1,
        cursor: cargando ? 'wait' : 'pointer'
      }}
    >
      <TypewriterIcon active={guardado} size={15} />
    </button>
  );
}

export default BotonGuardarLectura;