import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import Hero from './components/Hero/Hero'; 
import CatalogoLibros from './components/CatalogoLibros';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Recomendados } from './components/Recomendados/Recomendados';
import { Footer } from './components/Footer/Footer';
import VistaCorriente from './pages/VistaCorriente';
import DetalleLibro from './pages/DetalleLibro';
import PantallaAnalisis from './pages/PantallaAnalisis/PantallaAnalisis';
import AdminAnalisisForm from './pages/Admin-Analisis-Form/AdminAnalisisForm';

function App() {
  // Estado global para abrir/cerrar el menú
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
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
                <CatalogoLibros />
                <Recomendados /> 
              </>
            } />
                 
            {/* RUTA DE LOGIN (pública) */}
            <Route path="/login" element={<Login />} />
             <Route path="/corriente/:id" element={<VistaCorriente />} />    
             <Route path="/libro/:id" element={<DetalleLibro />} />
             <Route path="/libro/:id/analisis" element={<PantallaAnalisis />} />
            {/* RUTA ADMINISTRATIVA */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <Route path="/admin/analisis/:id" element={<AdminAnalisisForm />} />
                <AdminDashboard />
              </ProtectedRoute>
            } />

          </Routes>
        </div>

        {/* EL FOOTER QUEDA ACÁ AFUERA: Siempre visible al final de cualquier página */}
        <Footer />
      </div> 
    </Router>
  );
}

export default App;