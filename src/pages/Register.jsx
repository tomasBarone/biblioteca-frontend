import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api'

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
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
        if (!formData.username || !formData.password) {
            setError('Todos los campos son obligatorios.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setCargando(true);

        try {
            // Ajustá la URL según tu gateway o puerto de Spring Boot (ej: http://localhost:8080)
            await api.post('auth/register', {
                username: formData.username,
                password: formData.password
            });

            // Registro exitoso -> Redirigimos al Login
            navigate('/login');
        } catch (err) {
            console.error("Error en el registro:", err);
            setError(err.response?.data?.message || 'Error al registrar el usuario. El nombre de usuario podría estar duplicado.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)', // Descuenta el alto aproximado de la Navbar
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
                    textAlign: 'center'
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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6e6355', textTransform: 'uppercase' }}>
                            Usuario o Email
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            style={{
                                padding: '10px',
                                border: '1px solid #e8e2d5',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                            placeholder="Ej: tomas.gonzalez"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6e6355', textTransform: 'uppercase' }}>
                            Contraseña
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={{
                                padding: '10px',
                                border: '1px solid #e8e2d5',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                            placeholder="••••••••"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#6e6355', textTransform: 'uppercase' }}>
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={{
                                padding: '10px',
                                border: '1px solid #e8e2d5',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                outline: 'none'
                            }}
                            placeholder="••••••••"
                        />
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
                            opacity: cargando ? 0.7 : 1
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