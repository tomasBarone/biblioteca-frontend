import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import SearchOverlay from './components/SearchOverlay/SearchOverlay'; // <-- Importamos el componente de búsqueda
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Login from './pages/Login/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import { Footer } from './components/Footer/Footer';
import VistaCorriente from './pages/VistaCorriente';
import DetalleLibro from './pages/DetalleLibro';
import PantallaAnalisis from './pages/PantallaAnalisis/PantallaAnalisis';
import AdminAnalisisForm from './pages/Admin-Analisis-Form/AdminAnalisisForm';
import { AuthProvider } from './context/AuthContext';
import VistaLibros from './pages/VistaLibros/VistaLibros';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './pages/Checkout';
import AdminEditarForm from './pages/Admin-Editar-Form/AdminEditarForm';
import Home from './pages/Home.jsx';
import './pages/Home';

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State dedicado para la búsqueda

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
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
          
          {/* El Navbar recibe el handler para abrir el buscador al clickear la lupa */}
          <Navbar 
            onToggleMenu={() => setMenuAbierto(!menuAbierto)} 
            onOpenSearch={handleOpenSearch} 
          />

          {/* Menú Overlay Principal */}
          <MenuOverlay isOpen={menuAbierto} onClose={() => setMenuAbierto(false)} />

          {/* SearchOverlay de Búsqueda */}
          <SearchOverlay isOpen={isSearchOpen} onClose={handleCloseSearch} />

          <div style={{ flex: 1 }}>
            <Routes>
              {/* Le pasamos onOpenSearch a Home para que lo use el Hero */}
              <Route path="/" element={<Home onOpenSearch={handleOpenSearch} />} />
                    
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

          <Footer />
        </div> 
      </Router>
    </AuthProvider>
  );
}

export default App;