import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

function ProtectedRoute({ children, allowedRoles }) {
   const token = localStorage.getItem('token');
   const { user, cargando } = useAuth(); // Obtenemos el usuario y el estado de carga del contexto

   // 1. Si está procesando la validación del token, mostramos una carga rápida
   if (cargando) {
      return <div style={{ padding: '20px', textAlign: 'center' }}>Cargando...</div>;
   }

   // 2. Si no hay token físico, directo al login
   if (!token) {
      return <Navigate to="/login" replace />;
   }

   // 3. Si se requieren roles específicos, validamos que el usuario tenga al menos uno de ellos
   if (allowedRoles) {
      // Verificamos si el usuario tiene alguno de los roles permitidos
      const tieneRolPermitido = user?.roles?.some(rol => allowedRoles.includes(rol));
      
      if (!tieneRolPermitido) {
         // Si no tiene permisos, lo mandamos al Home de la librería (o a donde prefieras)
         return <Navigate to="/" replace />;
      }
   }

   // Si pasó todas las validaciones (tiene token y rol), renderiza el componente admin
   return children;
}

export default ProtectedRoute;