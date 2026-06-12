import React, { useState } from 'react'
import heroImg from '/src/assets/hero.png'
import './EstimateCard.css'

function EstimateCard({ bien, onEstimationValidee }) {
  const [prixEstime, setPrixEstime] = useState('')

  const handleValider = async () => {
    if (!prixEstime || isNaN(prixEstime)) {
      alert("Veuillez entrer un prix valide.")
      return
    }

    // Appel à la nouvelle route FastAPI (à créer par ta collègue)
    try {
      const response = await fetch(`http://localhost:8000/biens/${bien.id}/estimer`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prix: parseFloat(prixEstime) })
      })

      if (response.ok) {
        onEstimationValidee(bien.id) // Permet de retirer la carte de l'écran
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="estate-card">
      <img src={heroImg} className="estate-image" alt="A estimer" />
      <div className="estate-info">
        <h2 className="estate-title">{bien.titre}</h2>
        <p className="estate-description">{bien.ville} · {bien.surface} m² · {bien.type_bien}</p>
        
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
          <input 
            type="number" 
            placeholder="Prix estimé (€)" 
            value={prixEstime}
            onChange={(e) => setPrixEstime(e.target.value)}
            style={{ flex: 1, padding: '5px' }}
          />
          <button onClick={handleValider} className="btn btn-primary">Valider</button>
        </div>
      </div>
    </div>
  )
}

export default EstimateCard