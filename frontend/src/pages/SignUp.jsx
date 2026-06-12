import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'

//style
import '/src/App.css'

//component
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import { registerUser } from '/src/api';

function SignUp() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const form = event.target
    const nom = form.username.value.trim()
    const email = form.email.value.trim()
    const password = form.password.value.trim()
    const role = form.role.value

    if (!role) {
      setError('Veuillez sélectionner un rôle.')
      return
    }

    try {
      await registerUser({ nom, email, password, role })
      navigate('/Login')
    } catch (err) {
      setError('Impossible de créer le compte. Vérifiez les informations.')
    }
  }

  return (
    <>
      <Header />
      <section id="center">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" name="role" required>
              <option value="">Sélectionnez un rôle</option>
              <option value="client">Client</option>
              <option value="employe">Employé</option>
            </select>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default SignUp
