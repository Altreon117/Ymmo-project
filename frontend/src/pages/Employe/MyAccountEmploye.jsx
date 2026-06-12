import { useNavigate } from 'react-router-dom'
import { useAuth } from '/src/context/AuthContext'
import { logoutUser } from '/src/api'

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'

//style
import '/src/App.css'

//component
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';

function MyAccountEmploye() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    if (user?.id) {
      try {
        await logoutUser(user.id)
      } catch (err) {
        console.error('Logout failed', err)
      }
    }
    logout()
    navigate('/login')
  }

  return (
    <>
      <Header />
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Mon Compte Employé</h1>
          <p>Connecté en tant que {user?.nom} ({user?.role})</p>
          <button type="button" onClick={handleLogout} className="logout-button">
            Déconnexion
          </button>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default MyAccountEmploye
