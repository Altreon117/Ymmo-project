// comment est former le squeleette dun composant react
import React from "react";
import { useAuth } from '../context/AuthContext';
import HeaderEmploye from './HeaderEmploye';
import LogoNav from './LogoNav';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

//assets
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'

//style
import './Header.css'
  
function Header() {
    const { user, isAuthenticated } = useAuth()

    if (isAuthenticated && user?.role === 'employe') {
      return <HeaderEmploye />
    }

    return (
        <header className="header">
            <div className="logo" id ="logo1" >
                <Link to="/">
                    <img src={heroImg} className="base" width="100%" height="100%" alt="" />
                </Link>
            </div>
            <div className="Bar">
                <div className="NameHolder">
                    <h1>Ymmo</h1>
                </div>
                <nav className="navbar">
                    <SearchBar />
                    <ul>
                        <Link to="/">Accueil</Link>
                        <Link to="/EstateBoard">Catalogue</Link>
                        <Link to="/AgenciesBoard">Nos Agences</Link>
                        {isAuthenticated && user?.role === 'client' && (
                            <Link to="/MyTransactionClient">Mes Transactions</Link>
                        )}
                    </ul>
                </nav>
            </div>
            <div className="logo" id="logo2">
                <LogoNav />
            </div>
        </header>
    );
}

export default Header;