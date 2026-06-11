// comment est former le squeleette dun composant react
import React from "react";
import { Link } from 'react-router-dom';

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'

//style
import './Header.css'
  
function Header() {
    return (
        <header className="header">
            <div className="hero">
                <img src={heroImg} className="base" width="170" height="179" alt="" />
                <img src={reactLogo} className="framework" alt="React logo" />
                <img src={viteLogo} className="vite" alt="Vite logo" />
            </div>
            <h1>Ymmo</h1>
            <nav>
                <ul>
                    <li><Link to="/Test">Accueil</Link></li>
                    <li><Link to="/login">Catalogue</Link></li>
                    <li><Link to="/signup">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}

// on exporte le composant pour pouvoir l'utiliser dans d'autres fichiers
export default Header;

//comment utiliser un composant dans un autre fichier
// import Header from './Header';
// function App() {
//     return (
//         <div>
//             <Header />
//             <p>Bienvenue sur mon site</p>
//         </div>
//     );
// }