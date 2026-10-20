import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MisReservas = () => {
  const navigate = useNavigate();
  // Estado local para las reservas acumuladas (puedes guardarlo en localStorage o un Context de Reservas)
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    // Cargar reservas pendientes guardadas temporalmente
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas_pendientes')) || [];
    setReservas(reservasGuardadas);
  }, []);

  const eliminarReserva = (libroId) => {
    const actualizadas = reservas.filter(item => item.libro.id !== libroId);
    setReservas(actualizadas);
    localStorage.setItem('reservas_pendientes', JSON.stringify(actualizadas));
  };

  const modificarCantidad = (libroId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    const actualizadas = reservas.map(item => 
      item.libro.id === libroId ? { ...item, cantidad: nuevaCantidad } : item
    );
    setReservas(actualizadas);
    localStorage.setItem('reservas_pendientes', JSON.stringify(actualizadas));
  };

  // Redirigir al Checkout enviando todo el lote de reservas
  const procederAlCheckout = () => {
    if (reservas.length === 0) return;
    navigate('/checkout', { state: { reservas } });
  };

  if (reservas.length === 0) {
    return (
      <div style={{ backgroundColor: '#fcfaf2', minHeight: '80vh', padding: '60px 8%', textAlign: 'center', fontFamily: '"Playfair Display", Georgia, serif' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#2c1810', marginBottom: '15px' }}>Tu Lista de Reservas está vacía</h1>
        <p style={{ color: '#70695d', fontFamily: 'system-ui, sans-serif', marginBottom: '30px' }}>
          Explorá el catálogo para solicitar el préstamo de ejemplares.
        </p>
        <Link to="/libros" style={{
          backgroundColor: '#5c3a21',
          color: '#fcfaf2',
          padding: '12px 28px',
          borderRadius: '25px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: '600',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          fontFamily: 'system-ui, sans-serif'
        }}>
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', padding: '40px 10%', color: '#1a1917', fontFamily: '"Playfair Display", Georgia, serif' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '400', marginBottom: '10px' }}>Solicitud de Reservas Pendientes</h1>
      <p style={{ color: '#70695d', fontSize: '0.95rem', fontFamily: 'system-ui, sans-serif', marginBottom: '40px' }}>
        Revisá los ejemplares seleccionados antes de completar el formulario de retiro/envío.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 360px)', gap: '40px', alignItems: 'start' }}>
        
        {/* LISTADO DE EJEMPLARES SELECCIONADOS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {reservas.map(({ libro, cantidad }) => (
            <div key={libro.id} style={{
              display: 'flex',
              gap: '20px',
              backgroundColor: '#efebe0',
              padding: '20px',
              borderRadius: '6px',
              alignItems: 'center',
              border: '1px solid #e5dec9'
            }}>
              <img 
                src={libro.imagenUrl} 
                alt={libro.titulo} 
                style={{ width: '70px', height: '100px', objectFit: 'cover', borderRadius: '3px' }} 
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#2c1810' }}>{libro.titulo}</h3>
                <p style={{ margin: '0 0 10px 0', color: '#70695d', fontSize: '0.9rem', fontFamily: 'system-ui, sans-serif' }}>{libro.autor}</p>
                
                {/* Selector de cantidad de ejemplares */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'system-ui, sans-serif' }}>
                  <span style={{ fontSize: '0.85rem', color: '#555' }}>Ejemplares:</span>
                  <button onClick={() => modificarCantidad(libro.id, cantidad - 1)} style={btnCantidadStyle}>-</button>
                  <span style={{ fontWeight: '600', padding: '0 8px' }}>{cantidad}</span>
                  <button onClick={() => modificarCantidad(libro.id, cantidad + 1)} style={btnCantidadStyle}>+</button>
                </div>
              </div>

              <button 
                onClick={() => eliminarReserva(libro.id)} 
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#c62828',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '10px'
                }}
                title="Quitar de la lista"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* RESUMEN Y BOTÓN HACIA EL CHECKOUT */}
        <div style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '6px', border: '1px solid #e5dec9', position: 'sticky', top: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', paddingBottom: '10px' }}>
            Resumen del Préstamo
          </h3>

          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total de Obras:</span>
              <strong>{reservas.length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Ejemplares:</span>
              <strong>{reservas.reduce((acc, r) => acc + r.cantidad, 0)}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Duración del Préstamo:</span>
              <span>14 Días renovables</span>
            </div>
          </div>

          <button 
            onClick={procederAlCheckout}
            style={{
              width: '100%',
              backgroundColor: '#5c3a21',
              color: '#fcfaf2',
              border: 'none',
              padding: '16px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginTop: '25px',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            Proceder a Confirmación →
          </button>
        </div>

      </div>
    </div>
  );
};

const btnCantidadStyle = {
  backgroundColor: '#fcfaf2',
  border: '1px solid #d4cebe',
  borderRadius: '4px',
  width: '28px',
  height: '28px',
  cursor: 'pointer',
  fontWeight: 'bold',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default MisReservas;