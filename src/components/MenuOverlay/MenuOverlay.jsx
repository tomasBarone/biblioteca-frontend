import React, {useState} from 'react';
import './MenuOverlay.css'; 

function MenuOverlay (){

    const[isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

return(
   <>
    <nav className="navbar-fija">
        <div className= "navbar-logo">
            <h2>Biblioteca</h2> 
        </div>

        <button className="menu-icon-btn" onClick={toggleMenu}>
            ☰
        </button>
    </nav>

    <div className={`fullscreen-overlay ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>
            &times;
        </button>
        
        <div className= "overlay-links">
            <a href="#" onClick={toggleMenu}>Clasicismo</a>
            <a href="#" onClick={toggleMenu}>Barroco</a>
            <a href="#" onClick={toggleMenu}>Romanticismo</a>
            <a href="#" onClick={toggleMenu}>Realismo</a>
        </div>
    </div>

   </>
);
}

export default MenuOverlay;