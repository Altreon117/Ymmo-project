import { useEffect, useState } from 'react'
import Header from '/src/components/Header'
import Footer from '/src/components/Footer'
import AgencyCard from '/src/components/AgencyCard'

function AgenciesBoard() {
  const [agences, setAgences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // On suppose que ta collègue a créé la route GET /agences dans FastAPI
    fetch('http://localhost:8000/agences/')
      .then((res) => res.json())
      .then((data) => setAgences(data))
      .catch((err) => console.error("Erreur de chargement des agences", err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Header />
      <section id="center">
        <h1>Nos Agences Ymmo</h1>
        <div className="biensContainer">
          {loading && <p>Chargement...</p>}
          {!loading && agences.map((agence) => (
            <AgencyCard key={agence.id} agence={agence} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default AgenciesBoard