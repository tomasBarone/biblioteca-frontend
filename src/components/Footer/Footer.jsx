import React from 'react';
import './Footer.css'; // Importa sus propios estilos

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 className="footer-logo">Infinita Deriva</h3>
          <p className="footer-description">
            Una librería independiente dedicada a la literatura clásica y contemporánea desde 1978.
          </p>
        </div>

        <div className="footer-links">
          <h4>TIENDA</h4>
          <ul>
            <li><a href="/catalogo">Catálogo</a></li>
            <li><a href="/carrito">Carrito</a></li>
            <li><a href="/cuenta">Mi cuenta</a></li>
          </ul>
        </div>

        <div className="footer-info">
          <h4>VISÍTANOS</h4>
          <address>
            Calle del Lector, 12<br />
            Buenos Aires, Argentina<br />
            <a href="mailto:tomas.barone@hotmail.com">tomas.barone@hotmail.com</a><br />
            <span>Lun–Sáb · 10–21h</span>
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Infinita Deriva  · Todos los derechos reservados</p>
      </div>
    </footer>
  );
};