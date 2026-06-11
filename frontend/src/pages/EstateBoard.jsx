import { useEffect, useState } from 'react'

//style
import '/src/App.css'
import './EstateBoard.css'

//components
import Header from '/src/components/Header'
import Footer from '/src/components/Footer'
import Filter from '/src/components/Filter'
import EstateCard from '/src/components/EstateCard'
import Map from '/src/components/Map'
import { fetchBiens } from '/src/api'

function Catalogue() {
  const [biens, setBiens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetchBiens()
      .then((data) => {
        setBiens(data)
      })
      .catch((err) => {
        setError('Impossible de charger les biens.')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <Filter />

      <section id="center" style={{ padding: '0px' }}>
        <div className="RechercheContainer">
          <div className="Carte">
            <Map />
          </div>
          <div className="ListeBiens">
            <h1>Liste des biens immobiliers</h1>
            <p>{biens.length} biens trouvés</p>
            {error && <p className="error-message">{error}</p>}
            <div className="biensContainer">
              {loading && <p>Chargement...</p>}
              {!loading && biens.length === 0 && <p>Aucun bien trouvé.</p>}
              {!loading && biens.map((bien) => (
                <EstateCard key={bien.id} bien={bien} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Catalogue
