// comment est former le squeleette dun composant react
import React from "react";
import { Link } from 'react-router-dom';

//style
import './Footer.css'
  
function Footer() {
    return (
        <footer className="footer">
            <p>&copy; 2026 Ymmo. All rights reserved.</p>
        </footer>
    );
}