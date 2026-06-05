import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; // <-- IMPORTAMOS EL NUEVO ENCABEZADO
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import Hero from './components/Hero/Hero'; 
import CatalogoLibros from './components/CatalogoLibros';
import AdminDashboard from './pages/AdminDashboard';

function App() {

// 2. Creamos el estado global para abrir/cerrar el menú
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <Router>
      {/* CAMBIO RADICAL DE ESTÉTICA: Pasamos a los colores arena y beige del mockup */}
      <div style={{ 
        backgroundColor: '#fbf9f4', // Fondo general crema/arena de la imagen
        minHeight: '100vh', 
        color: '#1a1a1a', // Texto oscuro para alto contraste sobre claro
        fontFamily: '"Playfair Display", "Georgia", system-ui, sans-serif'
      }}>
        
        {/* El Navbar queda fijo arriba de todas las páginas */}
        <Navbar onToggleMenu={() => setMenuAbierto(!menuAbierto)} />

        {/* Menu overlay para cuando se abra el menú */}
        <MenuOverlay isOpen={menuAbierto} onClose={() => setMenuAbierto(false)} />

        <Routes>
          
          {/* RUTA PÚBLICA */}
          <Route path="/" element={
            <>
              <Hero />
              <CatalogoLibros />
            </>
          } />

          {/* RUTA ADMINISTRATIVA */}
          <Route path="/admin" element={<AdminDashboard />} />

        </Routes>
      </div> 
    </Router>
  );
}

export default App;