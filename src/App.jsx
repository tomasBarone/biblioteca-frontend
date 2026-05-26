import React from 'react';
import MenuOverlay from './components/MenuOverlay/MenuOverlay';

function App() {

  return (
    

    <div>
      <MenuOverlay />
     <header style={{ padding: '20px', background: '#fff', borderBottom: '1px solid #ddd '}}>
      <h1>Biblioteca Frontend</h1>
     </header>
    <main style={{ padding: '20px' }}>
       <p>Bienvenido al catalogo</p>
    </main>
    </div>
    

  );


}

export default App;