import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Usamos tu Axios configurado con interceptores
import { useAuth } from '../context/AuthContext'; // Importamos tu contexto

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    
    // Obtenemos los estados y métodos globales de autenticación
    const { user, iniciarSesion, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    // Reemplazamos la flag local 'isLoggedIn' simplemente evaluando si el objeto 'user' existe globalmente
    const isLoggedIn = !!user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            // El endpoint mapea directo a la baseURL configurada en services/api.js
            const respuesta = await api.post('/auth/login', { username, password });
            const token = respuesta.data.token || respuesta.data.jwt || respuesta.data; 

            if (token) {
                // El contexto guarda el token, decodifica claims (roles, sub) y actualiza de inmediato
                iniciarSesion(token);
                navigate('/admin');
            } else {
                setError('No se recibió un token válido del servidor.');
            }

        } catch (err) {
            console.error('Error durante el login:', err);
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        } finally {
            setCargando(false);
        }
    };

    const handleLogout = () => {
        cerrarSesion();
        setUsername('');
        setPassword('');
        navigate('/login');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '75vh',
            padding: '20px'
        }}>
            {isLoggedIn ? (
                /* --- INTERFAZ CUANDO YA ESTÁ LOGEADO --- */
                <div style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2dacb',
                    padding: '40px',
                    borderRadius: '4px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 20px rgba(44, 24, 16, 0.02)',
                    textAlign: 'center'
                }}>
                    <h2 style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.8rem',
                        color: '#2c1810',
                        marginBottom: '16px',
                        fontWeight: '400'
                    }}>
                        Sesión Activa
                    </h2>
                    
                    <p style={{
                        fontFamily: 'system-ui, sans-serif',
                        color: '#6e6355',
                        fontSize: '0.95rem',
                        marginBottom: '32px',
                        lineHeight: '1.5'
                    }}>
                        Actualmente te encontrás autenticado como <strong>{user?.sub || user?.username}</strong> en el sistema de gestión.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button 
                            onClick={() => navigate('/admin')}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#2c1810',
                                color: '#fdfbf7',
                                border: 'none',
                                borderRadius: '4px',
                                fontFamily: 'system-ui, sans-serif',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                fontSize: '0.85rem'
                            }}
                        >
                            Ir al Panel de Control
                        </button>

                        <button 
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '12px',
                                backgroundColor: '#fdfbf7',
                                color: '#ef4444',
                                border: '1px solid #ef4444',
                                borderRadius: '4px',
                                fontFamily: 'system-ui, sans-serif',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                fontSize: '0.85rem'
                            }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            ) : (
                /* --- INTERFAZ DEL FORMULARIO TRADICIONAL (NO LOGEADO) --- */
                <form onSubmit={handleSubmit} style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2dacb',
                    padding: '40px',
                    borderRadius: '4px',
                    width: '100%',
                    maxWidth: '400px',
                    boxShadow: '0 4px 20px rgba(44, 24, 16, 0.02)'
                }}>
                    <h2 style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.8rem',
                        color: '#2c1810',
                        marginBottom: '24px',
                        textAlign: 'center',
                        fontWeight: '400'
                    }}>
                        Ingreso Administrativo
                    </h2>

                    {error && (
                        <div style={{
                            backgroundColor: '#fde8ec',
                            color: '#ef4444',
                            padding: '10px',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            marginBottom: '16px',
                            fontFamily: 'system-ui, sans-serif'
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#9c8e7d', marginBottom: '6px' }}>
                            Usuario
                        </label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #e2dacb',
                                borderRadius: '4px',
                                backgroundColor: '#fdfbf7',
                                fontFamily: 'system-ui, sans-serif',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', color: '#9c8e7d', marginBottom: '6px' }}>
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #e2dacb',
                                borderRadius: '4px',
                                backgroundColor: '#fdfbf7',
                                fontFamily: 'system-ui, sans-serif',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={cargando}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#2c1810',
                            color: '#fdfbf7',
                            border: 'none',
                            borderRadius: '4px',
                            fontFamily: 'system-ui, sans-serif',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontSize: '0.85rem',
                            opacity: cargando ? 0.7 : 1
                        }}
                    >
                        {cargando ? 'Autenticando...' : 'Ingresar'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default Login;