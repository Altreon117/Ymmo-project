// comment est former le squeleette dun composant react
import React from "react";
import { Link } from 'react-router-dom';

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'

//style
import './EstateCard.css'
  
function EstateCard() {
    return (
        <div className="estate-card">
            <img src={heroImg} className="estate-image" alt="Estate" />
            <div className="estate-info">
                <h2 className="estate-title">Estate Title</h2>
                <p className="estate-description">Estate description goes here.</p>
                <Link to="/EstateDetails" className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default EstateCard;