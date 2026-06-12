import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
  const [biens, setBiens] = useState([]) // La liste brute de l'API
  const [biensFiltresMenu, setBiensFiltresMenu] = useState([]) // La liste après le composant <Filter>
  const [filteredBiens, setFilteredBiens] = useState([]) // La liste FINALE affichée à l'écran
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  // 1. Chargement initial depuis l'API
  useEffect(() => {
    setLoading(true)
    fetchBiens()
      .then((data) => {
        setBiens(data)
        setBiensFiltresMenu(data) // Par défaut, le menu filtre laisse tout passer
      })
      .catch((err) => {
        setError('Impossible de charger les biens.')
        console.error(err)
      })
      .finally(() => setLoading(false))
  }, [])

  // 2. Fonction appelée par ton composant <Filter />
  const handleFilter = (resultatsDuFiltre) => {
    // On ne met plus à jour l'affichage final directement, 
    // on stocke juste le résultat du menu déroulant
    setBiensFiltresMenu(resultatsDuFiltre)
  }

  // 3. Le filtre textuel (qui se base sur le résultat du menu déroulant)
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase()
      
      // Attention ici : on filtre "biensFiltresMenu" et plus "biens"
      const resulatFiltre = biensFiltresMenu.filter((bien) => {
        const matchTitre = bien.titre?.toLowerCase().includes(lowerQuery)
        const matchDesc = bien.description?.toLowerCase().includes(lowerQuery)
        const matchVille = bien.ville?.toLowerCase().includes(lowerQuery)
        const matchType = bien.type_bien?.toLowerCase().includes(lowerQuery)

        return matchTitre || matchDesc || matchVille || matchType
      })
      
      setFilteredBiens(resulatFiltre) // Là, on met à jour l'écran !
    } else {
      // Si pas de texte tapé, on affiche juste ce qui sort du menu <Filter>
      setFilteredBiens(biensFiltresMenu)
    }
  }, [biensFiltresMenu, searchQuery]) // Se déclenche si le texte OU le menu change

  return (
    <>
      <Header />
      {/* Le composant Filter reçoit la liste brute et renvoie son tri via handleFilter */}
      <Filter biens={biens} onFilter={handleFilter} />

      <section id="center" style={{ padding: '0px' }}>
        <div className="RechercheContainer">
          <div className="Carte">
            <Map biens={filteredBiens} />
          </div>
          <div className="ListeBiens">
            <h1 className="liste-biens-title">Liste des biens immobiliers</h1>
            
            {searchQuery && <p>Résultats pour la recherche : <strong>"{searchQuery}"</strong></p>}
            
            <p>{filteredBiens.length} biens trouvés</p>
            
            {error && <p className="error-message">{error}</p>}
            <div className="biensContainer">
              {loading && <p>Chargement...</p>}
              {!loading && filteredBiens.length === 0 && <p>Aucun bien trouvé.</p>}
              {!loading && filteredBiens.map((bien) => (
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