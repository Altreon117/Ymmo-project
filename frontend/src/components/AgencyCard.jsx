import React from 'react'

import './AgencyCard.css'


function AgencyCard({ agence }) {
  if (!agence) return null

  return (
    <div className="agency-card">
      <div className="agency-info">
        <h2 className="agency-title">{agence.nom}</h2>
        <p className="agency-description">{agence.adresse}</p>
        <p className="agency-meta">{agence.ville}</p>
      </div>
    </div>
  )
}

export default AgencyCard