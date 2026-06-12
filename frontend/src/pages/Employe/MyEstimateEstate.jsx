import { useState } from 'react'
import Header from '/src/components/Header'
import Footer from '/src/components/Footer'

function MyEstimateEstate() {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    type_bien: 'Maison',
    surface: '',
    ville: '',
    agence_id: 1 // À adapter dynamiquement plus tard
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // On prépare l'objet exactement comme FastAPI l'attend
    const payload = {
      ...formData,
      surface: parseFloat(formData.surface),
      prix: 0, // Valeur factice obligatoire pour le backend
      statut: "WaitingEstimation" // On force le statut
    }

    try {
      const response = await fetch('http://localhost:8000/biens/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (response.ok) {
        alert("Demande d'estimation envoyée avec succès !")
      } else {
        alert("Erreur lors de l'envoi.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Header />
      <section id="center">
        <h1>Demander une estimation</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', margin: '0 auto' }}>
          <input type="text" placeholder="Titre (ex: Belle maison)" required
            onChange={(e) => setFormData({...formData, titre: e.target.value})} />
          
          <textarea placeholder="Description" 
            onChange={(e) => setFormData({...formData, description: e.target.value})} />
          
          <select onChange={(e) => setFormData({...formData, type_bien: e.target.value})}>
            <option value="Maison">Maison</option>
            <option value="Appartement">Appartement</option>
          </select>
          
          <input type="number" placeholder="Surface (en m²)" required
            onChange={(e) => setFormData({...formData, surface: e.target.value})} />
            
          <input type="text" placeholder="Ville" required
            onChange={(e) => setFormData({...formData, ville: e.target.value})} />

          <button type="submit" className="btn btn-primary">Envoyer la demande</button>
        </form>
      </section>
      <Footer />
    </>
  )
}

export default MyEstimateEstate