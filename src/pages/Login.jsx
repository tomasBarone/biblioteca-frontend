import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){

     // Estados para manejar el formulario de login
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const[cargando, setCargando] = useState(false);
     const navigate = useNavigate();


     // Función que se ejecuta al enviar el formulario de login
     const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(false);

        try{
            // Aquí es donde hacemos la petición al backend para autenticar al usuario
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username:username,
                password: password
            });

             const token = respuesta.data.token || respuesta.data.jwt || respueta.data ; 

             if(token){
                localStorage.setItem('token', token); // Guardamos el token en el localStorage para usarlo en futuras peticiones
                navigate('/admin'); // Redirigimos al admin
             } else{
                setError('No se recibió un token válido del servidor.');
             }

        }catch (err){
            console.error('Error durante el login:', err);
            setError('Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.');
        } finally {
            setCargando(false);
        }

}

        return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '75vh',
            padding: '20px'
        }}>
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
        </div>
    );
}

export default Login;

