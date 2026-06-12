// comment est former le squeleette dun composant react
import React from "react"
import { Link } from 'react-router-dom'

//assets
import heroImg from '/src/assets/hero.png'

import SearchBar from './SearchBar'
import LogoNav from './LogoNav'

//style
import './HeaderEmploye.css'
  
function HeaderEmploye() {
    return (
        <header className="header">
            <div className="logo" id ="logo1" >
                <Link to="/IndexEmploye">
                    <img src={heroImg} className="base" width="100%" height="100%" alt="" />
                </Link>
            </div>
            <div className="Bar">
                <div className="NameHolder">
                    <h1>Ymmo - Employé</h1>
                </div>
                <nav className="navbar">
                    <ul>
                        <Link to="/IndexEmploye">Accueil</Link>
                        <Link to="/EstateBoard">Catalogue</Link>
                        <Link to="/AgenciesBoard">Nos Agences</Link>
                        <Link to="/EstateManager">Estimation</Link>
                        <Link to="/MyTransactionEmploye">Mes Transactions</Link>
                    </ul>
                </nav>
            </div>
            <div className="logo" id="logo2">
                <LogoNav />
            </div>
        </header>
    );
}

export default HeaderEmploye;