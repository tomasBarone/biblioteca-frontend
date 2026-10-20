import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { crearOrden } from '../services/ordenService'; 

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 1. Recibimos tanto si viene de "Mis Reservas" (state.reservas) como si viene de "Solicitar Ahora" (state.libro)
    const reservasState = location.state?.reservas;
    const libroIndividual = location.state?.libro;
    const cantidadIndividual = location.state?.cantidad || 1;

    // Normalizamos los items a un formato común: [{ libro, cantidad }]
    const itemsCheckout = reservasState 
        ? reservasState 
        : libroIndividual 
            ? [{ libro: libroIndividual, cantidad: cantidadIndividual }] 
            : [];

    // Estado del formulario adaptado a la reserva
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        metodoRetiro: 'envio' // envío a domicilio o retiro en sala
    });

    const [procesando, setProcesando] = useState(false);

    // Redirección de seguridad si entran sin seleccionar ninguna obra
    if (itemsCheckout.length === 0) {
        return (
            <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '60px', textAlign: 'center', color: '#1a1917' }}>
                <h2>No hay ningún ejemplar seleccionado para reservar.</h2>
                <Link to="/catalogo" style={{ color: '#5c3a21', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
                    Volver al Catálogo de Obras
                </Link>
            </div>
        );
    }

    const BASE_URL_BACKEND = 'http://localhost:8080';

    // Cálculos económicos globales para todos los ítems del carrito
    const costoGestionPorItem = 3500;
    const subtotalGeneral = itemsCheckout.reduce((acc, item) => acc + (Number(item.libro.precio) || 0) * item.cantidad, 0);
    const costoGestionTotal = itemsCheckout.length * costoGestionPorItem;
    const totalGeneral = subtotalGeneral + costoGestionTotal;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcesando(true);

        try {
            // Armamos el payload con todos los libros seleccionados para el backend
            const payload = itemsCheckout.map(item => ({
                libroId: item.libro.id,
                cantidad: Number(item.cantidad)
            }));

            const ordenCreada = await crearOrden(payload, formData.email);

            // Limpiamos las reservas pendientes del localStorage una vez procesada con éxito
            localStorage.removeItem('reservas_pendientes');

            alert(`¡Reserva confirmada con éxito! N° de Préstamo #${ordenCreada.id || 'confirmado'}. Se ha enviado el comprobante a tu correo.`);
            
            navigate('/catalogo');

        } catch (error) {
            console.error("Error al procesar la reserva:", error);
            const mensajeError = error.response?.data?.message || 'Ocurrió un error al procesar la reserva de los ejemplares. Intentá nuevamente.';
            alert(`Error: ${mensajeError}`);

        } finally {
            setProcesando(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 10%', color: '#1a1917' }}>
            
            {/* ENCABEZADO */}
            <div style={{ marginBottom: '30px' }}>
                <Link to="/reservas" style={{ color: '#70695d', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    ← VOLVER A MIS RESERVAS
                </Link>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '400', margin: '15px 0 0 0' }}>Solicitud de Préstamo</h1>
                <p style={{ color: '#70695d', fontSize: '0.95rem', margin: '5px 0 0 0', fontFamily: 'system-ui, sans-serif' }}>
                    Reserva de ejemplares por un período de 14 días renovables
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 400px)', gap: '50px', alignItems: 'start' }}>
                
                {/* FORMULARIO DE RESERVA */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    
                    <section style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', paddingBottom: '10px' }}>
                            1. Datos del Socio / Lector
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Nombre Completo</label>
                                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} style={inputStyle} placeholder="Jorge Luis Borges" />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Correo Electrónico de Notificación</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="lector@biblioteca.com" />
                            </div>
                        </div>
                    </section>

                    <section style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', paddingBottom: '10px' }}>
                            2. Domicilio de Entrega / Retiro
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={labelStyle}>Calle y Número</label>
                                <input type="text" name="direccion" required value={formData.direccion} onChange={handleChange} style={inputStyle} placeholder="Calle Florida 123" />
                            </div>
                            <div>
                                <label style={labelStyle}>Ciudad / Localidad</label>
                                <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} style={inputStyle} placeholder="CABA" />
                            </div>
                            <div>
                                <label style={labelStyle}>Código Postal</label>
                                <input type="text" name="codigoPostal" required value={formData.codigoPostal} onChange={handleChange} style={inputStyle} placeholder="1005" />
                            </div>
                        </div>
                    </section>

                    <section style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', paddingBottom: '10px' }}>
                            3. Modalidad de Préstamo
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
                                <input type="radio" name="metodoRetiro" value="envio" checked={formData.metodoRetiro === 'envio'} onChange={handleChange} />
                                Envío a domicilio del ejemplar
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
                                <input type="radio" name="metodoRetiro" value="presencial" checked={formData.metodoRetiro === 'presencial'} onChange={handleChange} />
                                Retiro presencial en Sala de Lectura (Sin costo de traslado)
                            </label>
                        </div>
                    </section>

                    <button 
                        type="submit" 
                        disabled={procesando}
                        style={{
                            backgroundColor: '#5c3a21',
                            color: '#fcfaf2',
                            border: 'none',
                            padding: '16px',
                            borderRadius: '30px',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            cursor: procesando ? 'wait' : 'pointer',
                            transition: 'background-color 0.2s ease',
                            marginTop: '10px'
                        }}
                    >
                        {procesando ? 'Confirmando Reserva...' : `CONFIRMAR RESERVA DE EJEMPLARES`}
                    </button>
                </form>

                {/* RESUMEN DE RESERVA MÚLTIPLE */}
                <div style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px', position: 'sticky', top: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', paddingBottom: '10px' }}>
                        Resumen de la Solicitud ({itemsCheckout.length} {itemsCheckout.length === 1 ? 'obra' : 'obras'})
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
                        {itemsCheckout.map(({ libro, cantidad }) => {
                            const urlImagen = libro.imagenUrl?.startsWith('http') 
                                ? libro.imagenUrl 
                                : `${BASE_URL_BACKEND}/uploads/${libro.imagenUrl}`;

                            return (
                                <div key={libro.id} style={{ display: 'flex', gap: '15px', paddingBottom: '15px', borderBottom: '1px solid #e5dec9', alignItems: 'center' }}>
                                    <img 
                                        src={urlImagen} 
                                        alt={libro.titulo} 
                                        style={{ width: '50px', height: '70px', objectFit: 'cover', borderRadius: '2px' }}
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 3px 0', fontSize: '0.95rem', fontWeight: '500' }}>{libro.titulo}</h4>
                                        <span style={{ fontSize: '0.8rem', color: '#70695d', display: 'block' }}>{libro.autor}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#70695d', display: 'block' }}>Cant: {cantidad} | ${Number(libro.precio || 0) * cantidad}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Aranceles de Conservación</span>
                            <span>$ {subtotalGeneral.toLocaleString('es-AR')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Gestión de Envío Total</span>
                            <span>$ {costoGestionTotal.toLocaleString('es-AR')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.15rem', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5dec9' }}>
                            <span>Total del Servicio</span>
                            <span>$ {totalGeneral.toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: '#70695d',
    marginBottom: '5px'
};

const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '4px',
    border: '1px solid #d4cebe',
    backgroundColor: '#fcfaf2',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
};

export default Checkout;