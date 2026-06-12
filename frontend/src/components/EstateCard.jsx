// comment est former le squeleette dun composant react
import React from 'react'
import { Link } from 'react-router-dom'

//assets
import heroImg from '/src/assets/hero.png'

//style
import './EstateCard.css'

function EstateCard({ bien }) {
  if (!bien) return null

  return (
    <div className="estate-card">
      <img src={heroImg} className="estate-image" alt={bien.titre} />
      <div className="estate-info">
        <h2 className="estate-title">{bien.titre}</h2>
        <p className="estate-description">{bien.description || 'Pas de description disponible.'}</p>
        <p className="estate-meta">{bien.ville} · {bien.surface} m² · {bien.type_bien}</p>
        <p className="estate-price">{bien.prix} €</p>
        <Link to={`/EstateDetails/${bien.id}`} className="btn btn-primary">
          Voir le détail
        </Link>
      </div>
    </div>
  )
}

export default EstateCard
