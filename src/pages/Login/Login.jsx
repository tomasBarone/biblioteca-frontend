import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './FloatingInput.css'; 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    
    const { user, iniciarSesion, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const isLoggedIn = !!user;

    // Evaluamos si el usuario actual es Administrador
    const esAdmin = Boolean(
        user?.roles?.includes('ROLE_ADMIN') || 
        user?.role === 'ROLE_ADMIN' ||
        user?.authorities?.some(a => a.authority === 'ROLE_ADMIN')
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            const respuesta = await api.post('/auth/login', { username, password });
            const token = respuesta.data.token || respuesta.data.jwt || respuesta.data; 

            if (token) {
                iniciarSesion(token);
                // Si es admin va al panel de control, sino a su biblioteca personal
                navigate(esAdmin ? '/admin' : '/biblioteca');
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
                        Actualmente te encontrás autenticado como <strong>{user?.sub || user?.username}</strong>.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* BOTÓN DINÁMICO SEGÚN ROL */}
                        {esAdmin ? (
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
                        ) : (
                            <button 
                                onClick={() => navigate('/biblioteca')}
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
                                Ir a Mis Lecturas
                            </button>
                        )}

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
                <form 
                    onSubmit={handleSubmit} 
                    autoComplete="off"
                    style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2dacb',
                        padding: '40px',
                        borderRadius: '4px',
                        width: '100%',
                        maxWidth: '400px',
                        boxShadow: '0 4px 20px rgba(44, 24, 16, 0.02)'
                    }}
                >
                    <input type="text" name="prevent_autofill" style={{ display: 'none' }} tabIndex={-1} />
                    <input type="password" name="password_fake" style={{ display: 'none' }} tabIndex={-1} />

                    <h2 style={{
                        fontFamily: '"Playfair Display", serif',
                        fontSize: '1.8rem',
                        color: '#2c1810',
                        marginBottom: '24px',
                        textAlign: 'center',
                        fontWeight: '400'
                    }}>
                        Iniciar Sesión
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

                    {/* INPUT USUARIO */}
                    <div className="floating-group">
                        <input 
                            id="username"
                            type="text" 
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=" "
                            autoComplete="off"
                            required
                            className="floating-input"
                        />
                        <label htmlFor="username" className="floating-label">
                            Usuario o Email
                        </label>
                    </div>

                    {/* INPUT CONTRASEÑA */}
                    <div className="floating-group">
                        <input 
                            id="password"
                            type="password" 
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                            autoComplete="new-password"
                            required
                            className="floating-input"
                        />
                        <label htmlFor="password" className="floating-label">
                            Contraseña
                        </label>
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
                            opacity: cargando ? 0.7 : 1,
                            marginTop: '8px'
                        }}
                    >
                        {cargando ? 'Autenticando...' : 'Ingresar'}
                    </button>

                    {/* ACCESO DIRECTO A REGISTRO */}
                    <div style={{
                        marginTop: '24px',
                        paddingTop: '16px',
                        borderTop: '1px solid #f0eafe',
                        textAlign: 'center',
                        fontFamily: 'system-ui, sans-serif',
                        fontSize: '0.88rem',
                        color: '#6e6355'
                    }}>
                        ¿No tenés una cuenta?{' '}
                        <Link 
                            to="/register" 
                            style={{
                                color: '#2c1810',
                                fontWeight: '600',
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px'
                            }}
                        >
                            Registrate acá
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Login;