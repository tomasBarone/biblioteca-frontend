import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { crearOrden } from '../services/ordenService'; 
const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Recuperamos el libro enviado por navigate('/checkout', { state: { libro, cantidad: 1 } })
    const libro = location.state?.libro;
    const cantidad = location.state?.cantidad || 1;

    // Estado del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        direccion: '',
        ciudad: '',
        codigoPostal: '',
        metodoPago: 'tarjeta'
    });

    const [procesando, setProcesando] = useState(false);

    // Redirección de seguridad si intentan entrar directamente a /checkout sin un libro seleccionado
    if (!libro) {
        return (
            <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '60px', textAlign: 'center', color: '#1a1917' }}>
                <h2>No hay ningún libro seleccionado para la compra.</h2>
                <Link to="/catalogo" style={{ color: '#5c3a21', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
                    Volver al Catálogo
                </Link>
            </div>
        );
    }

    const BASE_URL_BACKEND = 'http://localhost:8080';
    const urlImagen = libro.imagenUrl?.startsWith('http') 
        ? libro.imagenUrl 
        : `${BASE_URL_BACKEND}/uploads/${libro.imagenUrl}`;

    
    const precioUnitario = Number(libro.precio) || 0;
    const subtotal = precioUnitario * cantidad;
    const envio = 3500; // Costo fijo simulado de envío
    const total = subtotal + envio;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setProcesando(true);

    try {
        // Armamos el payload con la estructura que espera tu endpoint POST /api/ordenes
        const payload = [
            {
                libroId: libro.id,
                cantidad: Number(cantidad)
            }
        ];

        // Disparamos la petición HTTP al servidor Spring Boot
        const ordenCreada = await crearOrden(payload, formData.email);

        alert(`¡Compra realizada con éxito! Orden #${ordenCreada.id || 'confirmada'}. Gracias por adquirir ${libro.titulo}.`);
        
        // Redirigimos al catálogo
        navigate('/catalogo');

    } catch (error) {
        console.error("Error al procesar la orden:", error);
        
        // Capturamos el mensaje de excepción lanzado por Spring (ej: StockInsuficienteException)
        const mensajeError = error.response?.data?.message || 'Ocurrió un error al procesar el pago. Intentá nuevamente.';
        alert(`Error: ${mensajeError}`);

    } finally {
        setProcesando(false);
    }
};

    return (
        <div style={{ backgroundColor: '#fcfaf2', minHeight: '100vh', fontFamily: '"Playfair Display", Georgia, serif', padding: '40px 10%', color: '#1a1917' }}>
            
            {/* ENCABEZADO Y BREADCRUMB */}
            <div style={{ marginBottom: '30px' }}>
                <Link to={`/libro/${libro.id}`} style={{ color: '#70695d', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none' }}>
                    ← VOLVER AL LIBRO
                </Link>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '400', margin: '15px 0 0 0' }}>Finalizar Compra</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(320px, 400px)', gap: '50px', alignItems: 'start' }}>
                
                {/* COLUMNA IZQUIERDA: FORMULARIO DE ENVÍO Y PAGO */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    
                    <section style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', pb: '10px' }}>
                            1. Datos del Comprador
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', marginBottom: '5px' }}>Nombre Completo</label>
                                <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} style={inputStyle} placeholder="Jorge Luis Borges" />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', marginBottom: '5px' }}>Correo Electrónico</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} placeholder="lector@biblioteca.com" />
                            </div>
                        </div>
                    </section>

                    <section style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', pb: '10px' }}>
                            2. Dirección de Envío
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', marginBottom: '5px' }}>Calle y Número</label>
                                <input type="text" name="direccion" required value={formData.direccion} onChange={handleChange} style={inputStyle} placeholder="Calle Florida 123" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', marginBottom: '5px' }}>Ciudad / Localidad</label>
                                <input type="text" name="ciudad" required value={formData.ciudad} onChange={handleChange} style={inputStyle} placeholder="CABA" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#70695d', marginBottom: '5px' }}>Código Postal</label>
                                <input type="text" name="codigoPostal" required value={formData.codigoPostal} onChange={handleChange} style={inputStyle} placeholder="1005" />
                            </div>
                        </div>
                    </section>

                    <section style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', pb: '10px' }}>
                            3. Método de Pago
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
                                <input type="radio" name="metodoPago" value="tarjeta" checked={formData.metodoPago === 'tarjeta'} onChange={handleChange} />
                                Tarjeta de Crédito / Débito
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
                                <input type="radio" name="metodoPago" value="transferencia" checked={formData.metodoPago === 'transferencia'} onChange={handleChange} />
                                Transferencia Bancaria (10% OFF)
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
                            fontSize: '1rem',
                            fontWeight: '600',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            cursor: procesando ? 'wait' : 'pointer',
                            transition: 'background-color 0.2s ease',
                            marginTop: '10px'
                        }}
                    >
                        {procesando ? 'Procesando Orden...' : `CONFIRMAR Y PAGAR $ ${total.toLocaleString('es-AR')}`}
                    </button>
                </form>

                {/* COLUMNA DERECHA: RESUMEN DEL PEDIDO */}
                <div style={{ backgroundColor: '#efebe0', padding: '25px', borderRadius: '4px', position: 'sticky', top: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0 0 20px 0', borderBottom: '1px solid #e5dec9', paddingBottom: '10px' }}>
                        Resumen de la Orden
                    </h3>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5dec9' }}>
                        <img 
                            src={urlImagen} 
                            alt={libro.titulo} 
                            style={{ width: '70px', height: '100px', objectFit: 'cover', borderRadius: '2px' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div>
                            <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', fontWeight: '500' }}>{libro.titulo}</h4>
                            <span style={{ fontSize: '0.85rem', color: '#70695d', display: 'block' }}>{libro.autor}</span>
                            <span style={{ fontSize: '0.85rem', color: '#70695d', display: 'block', marginTop: '5px' }}>Cantidad: {cantidad}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Subtotal</span>
                            <span>$ {subtotal.toLocaleString('es-AR')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span>Envío estimado</span>
                            <span>$ {envio.toLocaleString('es-AR')}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #e5dec9' }}>
                            <span>Total</span>
                            <span>$ {total.toLocaleString('es-AR')}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

// Estilo reutilizable para los inputs
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