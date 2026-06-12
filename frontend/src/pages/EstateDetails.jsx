import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

//style
import '/src/App.css'

//component
import Header from '/src/components/Header'
import Footer from '/src/components/Footer'
import BuyForm from '../components/BuyForm'
import { fetchBien } from '/src/api'

function EstateDetails() {
  const { id } = useParams()
  const [bien, setBien] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    setLoading(true)
    fetchBien(id)
      .then((data) => setBien(data))
      .catch((err) => {
        console.error(err)
        setError('Impossible de charger les détails du bien.')
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <>
      <Header />
      <section id="center">
        {loading && <p>Chargement...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && bien && (
          <div className="estate-detail">
            <h1>{bien.titre}</h1>
            <p>{bien.description}</p>
            <p>Type: {bien.type_bien}</p>
            <p>Ville: {bien.ville}</p>
            <p>Surface: {bien.surface} m²</p>
            <p>Prix: {bien.prix} €</p>
            <p>Statut: {bien.statut}</p>
            <BuyForm bien={bien} />
            <Link to="/EstateBoard">Retour à la liste</Link>
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}

export default EstateDetails
