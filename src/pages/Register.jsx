import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Login/FloatingInput.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // 🛡️ Validación en el cliente antes de pegarle al Backend
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setCargando(true);

        try {
            console.log("Intentando registrar usuario:", formData);
            await api.post('auth/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            // Registro exitoso -> Redirigimos al Login
            navigate('/login');
        } catch (err) {
            console.error("Error en el registro:", err);
            
            const data = err.response?.data;

            if (data) {
                // 1. Si viene un objeto de ErrorDetalles (priorizamos la propiedad de mensaje explícita)
                if (data.mensaje) {
                    setError(data.mensaje);
                } else if (data.message) {
                    setError(data.message);
                }
                // 2. Si Spring Boot devuelve un Map de errores por campo (@Valid) -> { email: "...", username: "..." }
                else if (typeof data === 'object' && !Array.isArray(data)) {
                    const mensajes = Object.values(data).join(' | ');
                    setError(mensajes);
                }
                // 3. Si devuelve una cadena de texto plana
                else if (typeof data === 'string') {
                    setError(data);
                } 
                else {
                    setError('Error al registrar el usuario. Verifique los datos ingresados.');
                }
            } else {
                setError('Error de conexión con el servidor.');
            }
        } finally {
            setCargando(false);
        }
    };

    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#f9f6f0',
        fontFamily: 'system-ui, sans-serif'
    }}>
        <div style={{
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '4px',
            border: '1px solid #e8e2d5',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
            width: '100%',
            maxWidth: '400px'
        }}>
            <h2 style={{
                margin: '0 0 24px 0',
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontSize: '1.8rem',
                color: '#2c1810',
                textAlign: 'center',
                fontWeight: '400'
            }}>
                Crear Cuenta
            </h2>

            {error && (
                <div style={{
                    backgroundColor: '#fdf2f2',
                    border: '1px solid #f8b4b4',
                    color: '#9b1c1c',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    marginBottom: '16px'
                }}>
                    {error}
                </div>
            )}

            <form 
                onSubmit={handleSubmit} 
                autoComplete="off" 
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                {/* Inputs ocultos para prevenir el auto-relleno automático al cargar la vista */}
                <input type="text" name="prevent_autofill" style={{ display: 'none' }} tabIndex={-1} />
                <input type="password" name="password_fake" style={{ display: 'none' }} tabIndex={-1} />

                {/* EMAIL */}
                <div className="floating-group">
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder=" "
                        autoComplete="off"
                        required
                        className="floating-input"
                    />
                    <label htmlFor="email" className="floating-label">
                        Email
                    </label>
                </div>

                {/* NOMBRE DE USUARIO */}
                <div className="floating-group">
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder=" "
                        autoComplete="off"
                        required
                        className="floating-input"
                    />
                    <label htmlFor="username" className="floating-label">
                        Nombre de Usuario
                    </label>
                </div>

                {/* CONTRASEÑA */}
                <div className="floating-group">
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                        autoComplete="new-password"
                        required
                        className="floating-input"
                    />
                    <label htmlFor="password" className="floating-label">
                        Contraseña
                    </label>
                </div>

                {/* CONFIRMAR CONTRASEÑA */}
                <div className="floating-group">
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder=" "
                        autoComplete="new-password"
                        required
                        className="floating-input"
                    />
                    <label htmlFor="confirmPassword" className="floating-label">
                        Confirmar Contraseña
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={cargando}
                    style={{
                        backgroundColor: '#2c1810',
                        color: '#ffffff',
                        border: 'none',
                        padding: '12px',
                        borderRadius: '4px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: cargando ? 'not-allowed' : 'pointer',
                        marginTop: '8px',
                        transition: 'background-color 0.2s',
                        opacity: cargando ? 0.7 : 1,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    {cargando ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6e6355', marginTop: '24px', marginBottom: 0 }}>
                ¿Ya tenés cuenta?{' '}
                <Link to="/login" style={{ color: '#2c1810', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid #2c1810' }}>
                    Iniciá Sesión
                </Link>
            </p>
        </div>
    </div>
);
}

export default Register;