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
import { loginUser } from '/src/api';

function Login() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const form = event.target
    const email = form.email.value.trim()
    const password = form.password.value.trim()

    try {
      const user = await loginUser({ email, password })
      localStorage.setItem('ymmo_user', JSON.stringify(user))
      navigate('/EstateBoard')
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
      </section>
      <Footer />
    </>
  )
}

export default Login
    