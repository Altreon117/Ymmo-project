import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'

//style
import '/src/App.css'

//component
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import { loginUser } from '/src/api';
import { useAuth } from '/src/context/AuthContext';

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const form = event.target
    const email = form.email.value.trim()
    const password = form.password.value.trim()

    try {
      const response = await loginUser({ email, password })
      // Store user and token in auth context
      login(
        {
          id: response.id,
          nom: response.nom,
          email: response.email,
          role: response.role,
        },
        response.token
      )

      // Redirect based on role
      if (response.role === 'client') {
        navigate('/')
      } else if (response.role === 'employe') {
        navigate('/IndexEmploye')
      } else {
        navigate('/EstateBoard')
      }
    } catch (err) {
      setError('Identifiants invalides, réessayez.')
    }
  }

  return (
    <>
      <Header />
      <section id="center">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit">Login</button>
        </form>

        <Link to="/SignUp">Don't have an account ? Sign up</Link>
      </section>
      <Footer />
    </>
  )
}

export default Login