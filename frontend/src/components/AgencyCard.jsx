import React from 'react'
import './EstateCard.css' // Tu peux réutiliser le même style de base

function AgencyCard({ agence }) {
  if (!agence) return null

  return (
    <div className="estate-card">
      <div className="estate-info">
        <h2 className="estate-title">{agence.nom}</h2>
        <p className="estate-description">{agence.adresse}</p>
        <p className="estate-meta">{agence.ville}</p>
      </div>
    </div>
  )
}

export default AgencyCard