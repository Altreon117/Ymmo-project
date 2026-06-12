import { useEffect, useState } from 'react'

// Style (Tu peux réutiliser le CSS de ton catalogue)
import '/src/App.css'
import '../EstateBoard.css'

// Composants
import Header from '/src/components/Header'
import Footer from '/src/components/Footer'
import EstimateCard from '/src/components/EstimateCard'

function EstateManager() {
  const [biensEnAttente, setBiensEnAttente] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // 1. Récupération des biens au chargement de la page
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/biens/statut/attente')
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur")
        return res.json()
      })
      .then((data) => {
        setBiensEnAttente(data)
      })
      .catch((err) => {
        setError('Impossible de charger les biens en attente.')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  // 2. Fonction appelée quand l'agent valide un prix dans l'EstimateCard
  const handleEstimationValidee = (idDuBienEstime) => {
    // On met à jour l'affichage en retirant le bien qui vient d'être traité
    setBiensEnAttente((ancienneListe) => 
      ancienneListe.filter((bien) => bien.id !== idDuBienEstime)
    )
    alert("Le bien a été estimé et publié avec succès !")
  }

  return (
    <>
      <Header />

      <section id="center">
        <h1>Tableau de bord : Estimations en attente</h1>
        <p>Gérez les demandes d'estimation de vos clients et fixez les prix de vente.</p>

        {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

        <div className="biensContainer" style={{ marginTop: '30px' }}>
          {loading && <p>Chargement des demandes...</p>}
          
          {!loading && biensEnAttente.length === 0 && (
            <p>Super ! Vous êtes à jour, il n'y a aucune estimation en attente.</p>
          )}

          {!loading && biensEnAttente.map((bien) => (
            <EstimateCard 
              key={bien.id} 
              bien={bien} 
              onEstimationValidee={handleEstimationValidee} 
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}

export default EstateManager