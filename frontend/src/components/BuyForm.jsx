import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { createTransaction, fetchAgences } from '../api'

function BuyForm({ bien }) {
  const { user, isAuthenticated } = useAuth()
  
  const [prixPropose, setPrixPropose] = useState(bien.prix)
  const [nomAgence, setNomAgence] = useState("Recherche de l'agence...")
  const [message, setMessage] = useState('')

  // On récupère le vrai nom de l'agence grâce à son ID
  useEffect(() => {
    fetchAgences()
      .then((agences) => {
        // On cherche l'agence dont l'ID correspond à l'agence_id du bien
        const agenceTrouvee = agences.find(a => a.id === bien.agence_id)
        if (agenceTrouvee) {
          setNomAgence(agenceTrouvee.nom + " (" + agenceTrouvee.ville + ")")
        } else {
          setNomAgence("Agence inconnue")
        }
      })
      .catch((err) => console.error("Erreur chargement des agences", err))
  }, [bien.agence_id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setMessage("Vous devez être connecté pour faire une proposition.")
      return
    }

    try {
      await createTransaction({
        bien_id: bien.id,
        client_id: user.id,
        prix_final: parseFloat(prixPropose),
        agent_id: bien.agence_id // Le bien appartient à cette agence, on envoie son ID
      })
      setMessage("Votre proposition a été envoyée avec succès !")
    } catch (error) {
      setMessage("Erreur : Impossible d'envoyer la proposition.")
      console.error(error)
    }
  }

  return (
    <div className="buy-form-container" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Faire une proposition d'achat</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* Affichage en texte simple, sans <input> */}
        <div>
            <span style={{ color: '#666', marginRight: '10px' }}>Agence en charge :</span>
            <strong>{nomAgence}</strong>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label>Votre prix proposé (€) :</label>
            <input 
            type="number" 
            value={prixPropose} 
            onChange={(e) => setPrixPropose(e.target.value)} 
            required 
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '5px' }}>
          Proposer
        </button>
      </form>
      {message && <p style={{ marginTop: '10px', color: message.includes('Erreur') ? 'red' : 'green', fontWeight: 'bold' }}>{message}</p>}
    </div>
  )
}

export default BuyForm