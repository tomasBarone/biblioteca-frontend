import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

// 1. Creamos el contexto (El "Bean" de configuración)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Función interna para verificar y decodificar el token
    const procesarSesion = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decodificamos el JWT que viene de Spring Boot
                const decoded = jwtDecode(token);
                
                // Verificamos si expiró (exp viene en segundos)
                if (decoded.exp * 1000 < Date.now()) {
                    cerrarSesion();
                } else {
                    // Mapeamos el estado con los claims reales de tu backend (sub, roles, etc.)
                    setUser({
                        username: decoded.sub,
                        roles: decoded.roles || []
                    });
                }
            } catch (error) {
                console.error("Error al decodificar el token JWT:", error);
                cerrarSesion();
            }
        } else {
            setUser(null);
        }
        setCargando(false);
    };

    useEffect(() => {
        procesarSesion();
    }, []);

    const iniciarSesion = (token) => {
        localStorage.setItem('token', token);
        procesarSesion();
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Proveemos el estado y las funciones de control a toda la app
    return (
        <AuthContext.Provider value={{ user, iniciarSesion, cerrarSesion, cargando }}>
            {children}
        </AuthContext.Provider>
    );
}

// 2. Custom Hook para consumir el contexto de forma limpia
export function useAuth() {
    return useContext(AuthContext);
}