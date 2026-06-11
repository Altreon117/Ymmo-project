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
            <div className="logo" id ="logo1" >
                <Link to="/">
                    <img src={heroImg} className="base" width="100%" height="100%" alt="" />
                    {/* <img src={reactLogo} className="framework" alt="React logo" /> */}
                    {/* <img src={viteLogo} className="vite" alt="Vite logo" /> */}
                </Link>
            </div>
            <div className="Bar">
                <div className="NameHolder">
                    <h1>Ymmo</h1>
                </div>
                <nav className="navbar">
                    <ul>
                        <Link to="/">Accueil</Link>
                        <Link to="/EstateBoard">Catalogue</Link>
                        <Link to="/Agencies">Nos Agences</Link>
                    </ul>
                </nav>
            </div>
            <div className="logo" id="logo2">
                <Link to="/Login">
                    <img src={heroImg} className="base" alt="" />
                    {/* <img src={reactLogo} className="framework" alt="React logo" /> */}
                    {/* <img src={viteLogo} className="vite" alt="Vite logo" /> */}
                </Link>
            </div>
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