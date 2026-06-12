import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import heroImg from '../assets/hero.png'
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
        className="logo-button"
        onClick={handleLogoClick}
        title={isAuthenticated ? `Profil (${user?.nom})` : 'Se connecter'}
      >
        <img src={heroImg} className="logo-image" alt="Logo" />
      </button>
    </div>
  )
}

export default LogoNav
