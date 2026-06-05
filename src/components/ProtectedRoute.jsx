import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children}) {
   const token = localStorage.getItem('token'); // Verificamos si el token existe en el localStorage

   if (!token) {
      // Si no hay token, redirigimos al login
      return <Navigate to="/login" replace />;
   }

    // Si hay token, renderizamos el componente hijo (la ruta protegida)
    return children;

}


export default ProtectedRoute;