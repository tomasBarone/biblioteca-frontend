import React from 'react';
import './LibroCard.css';

function LibroCard({titulo,autor,precio,generoNombre }) {

  const formatPrecio = (valor) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor);
  }

  return (

    <div className="libro-card">
    
    <div className= "libro-portada-placeholder">
    
    <span className="badge-genero">{generoNombre || "General"}</span>
    <div className="portada-icono"> 📖 </div>
    
    </div>
    
    <div className="libro-info">
        <h3 className="libro-titulo" title={titulo}> {titulo} </h3>
        <p className="libro-autor"> por {autor} </p>
         
         <div className="libro-footer">
            <span className="libro-precio">{formatPrecio(precio)}</span>
              <button className= "btn-add-carrito" title = "Agregar al carrito ">
                    🛒
              </button>
 
         </div>



    </div>
    
    
    </div>
   
  )


 }

 export default LibroCard;