import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import heroImg from '../assets/hero.png'
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import './LogoNav.css'

function LogoNav() {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogoClick = () => {
    if (isAuthenticated && user) {
      if (user.role === 'client') {
        navigate('/MyAccountClient')
      } else if (user.role === 'employe') {
        navigate('/MyAccountEmploye')
      }
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="logo-nav-container">
      <button
        className="logo-stack" /* <-- On utilise la même classe magique ! */
        onClick={handleLogoClick}
        title={isAuthenticated ? `Profil (${user?.nom})` : 'Se connecter'}
      >
        <img src={heroImg} className="base" alt="Logo" /> {/* <-- Ajout de la classe "base" */}
        <img src={reactLogo} className="framework" alt="React logo" />
        <img src={viteLogo} className="vite" alt="Vite logo" />
      </button>
    </div>
  )
}

export default LogoNav
