import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import Hero from './components/Hero/Hero'; 
import MovimientoSection from './components/MovimientoCard/MovimientoSection';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Recomendados } from './components/Recomendados/Recomendados';
import { Footer } from './components/Footer/Footer';
import VistaCorriente from './pages/VistaCorriente';
import DetalleLibro from './pages/DetalleLibro';
import PantallaAnalisis from './pages/PantallaAnalisis/PantallaAnalisis';
import AdminAnalisisForm from './pages/Admin-Analisis-Form/AdminAnalisisForm';
import { AuthProvider } from './context/AuthContext'; // Importamos el Provider del contexto de autenticación
import VistaLibros from './pages/VistaLibros/VistaLibros';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout';
import AdminEditarForm from './pages/Admin-Editar-Form/AdminEditarForm';

function App() {
  // Estado global para abrir/cerrar el menú (se mantiene intacto)
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (

  
    // 2. ENVOLVEMOS TODO CON EL PROVIDER
    <AuthProvider> 

   <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />

      <Router>
       
        <div style={{ 
          backgroundColor: '#fbf9f4', 
          minHeight: '100vh', 
          color: '#1a1a1a', 
          fontFamily: '"Playfair Display", "Georgia", system-ui, sans-serif',
          display: 'flex',          
          flexDirection: 'column'
        }}>
          
          {/* El Navbar queda fijo arriba de todas las páginas */}
          <Navbar onToggleMenu={() => setMenuAbierto(!menuAbierto)} />

          {/* Menu overlay para cuando se abra el menú */}
          <MenuOverlay isOpen={menuAbierto} onClose={() => setMenuAbierto(false)} />

          {/* Contenedor principal para que crezca y empuje al footer */}
          <div style={{ flex: 1 }}>
            <Routes>
              
              {/* RUTA PÚBLICA PRINCIPAL */}
              <Route path="/" element={
                <>
                  <Hero />
                  <MovimientoSection />
                  <Recomendados /> 
                </>
              } />
                   
              {/* RUTA DE LOGIN (pública) */}
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/corriente/:id" element={<VistaCorriente />} />    
              <Route path="/libro/:id" element={<DetalleLibro />} />
              <Route path="/libro/:id/analisis" element={<PantallaAnalisis />} />
              <Route path="/libros" element={<VistaLibros />} />
              <Route path="/checkout" element={<Checkout />} />
              
               
          
              {/* RUTAS ADMINISTRATIVAS PROTEGIDAS */}
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="/admin/analisis/:id" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminAnalisisForm />
                </ProtectedRoute>
              } />

              <Route path="/admin/editar/:id" element={
                <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                  <AdminEditarForm />
                </ProtectedRoute>
              } />
            </Routes>
          </div>

          {/* EL FOOTER QUEDA ACÁ AFUERA: Siempre visible al final de cualquier página */}
          <Footer />
        </div> 
      </Router>
    </AuthProvider>
  );
}

export default App;