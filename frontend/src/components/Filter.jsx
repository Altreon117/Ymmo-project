import React from 'react'

import './Filter.css'

function Filter() {
  return (
    <div className="filter">
    <select className="filter-dropdown">
        <option>ACHETER</option>
        <option>LOUER</option>
    </select>
      <input type="text" placeholder="Où voulez-vous vivre ?" className="search-input" />
      <div className="divider" />

      <select className="filter-dropdown" placeholder="Type de bien">
        <option>Appartement</option>
        <option>Maison</option>
        <option>Commerce</option>
        <option>Annexe</option>
        <option>Immeuble</option>
        <option>Neuf</option>
        <option>Professionnel</option>
        <option>Terrain</option>
        <option>Marina</option>
        <option>Divers</option>
      </select>
      <div className="divider" />

      <select className="filter-dropdown" placeholder="Pièces">
        <option>1 pièce</option>
        <option>2 pièces</option>
        <option>3 pièces</option>
        <option>4 pièces</option>
        <option>5 pièces et +</option>
      </select>
      <div className="divider" />

      <input type="text" placeholder="Surface min. (m²)" className="search-input" />
      <div className="divider" />

      <input type="text" placeholder="Budget max." className="search-input" />
      <div className="divider" />

      <button className="filter-submit" type="button">OK</button>
    </div>
  )
}

export default Filter