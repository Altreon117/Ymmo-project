import React, { useState, useEffect } from 'react'

import './Filter.css'

function Filter({ biens, onFilter }) {
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    propertyType: '',
    rooms: '',
    minSurface: '',
    maxPrice: '',
  })

  // Apply filters whenever filters or biens change
  useEffect(() => {
    if (!onFilter || !biens) return

    let filtered = biens

    // 1. NOUVEAU : Filtrer par type d'article (ACHETER ou LOUER)
    if (filters.type) {
      filtered = filtered.filter((bien) =>
        bien.type_article === filters.type
      )
    }

    // 2. Filtrer par localisation (ville)
    if (filters.location) {
      filtered = filtered.filter((bien) =>
        bien.ville?.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    // 3. Filtrer par type de bien (Appartement, Maison, etc.)
    if (filters.propertyType) {
      filtered = filtered.filter((bien) =>
        bien.type_bien?.toLowerCase() === filters.propertyType.toLowerCase()
      )
    }

    // 4. CORRIGÉ : Filtrer par nombre de pièces (nbr_pieces)
    if (filters.rooms) {
      const roomCount = parseInt(filters.rooms, 10)
      if (roomCount === 5) {
        // Si l'option "5 pièces et +" est sélectionnée
        filtered = filtered.filter((bien) => bien.nbr_pieces >= 5)
      } else {
        // Pour les autres options (1, 2, 3, 4)
        filtered = filtered.filter((bien) => bien.nbr_pieces === roomCount)
      }
    }

    // 5. Filtrer par surface minimum
    if (filters.minSurface) {
      const minSurf = parseFloat(filters.minSurface)
      filtered = filtered.filter((bien) => bien.surface >= minSurf)
    }

    // 6. Filtrer par prix maximum
    if (filters.maxPrice) {
      const maxPrix = parseFloat(filters.maxPrice)
      filtered = filtered.filter((bien) => bien.prix <= maxPrix)
    }

    onFilter(filtered)
  }, [filters, biens, onFilter])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleReset = () => {
    setFilters({
      type: '',
      location: '',
      propertyType: '',
      rooms: '',
      minSurface: '',
      maxPrice: '',
    })
  }

  return (
    <div className="filter">
      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="filter-dropdown"
      >
        <option value="">ACHETER / LOUER</option>
        <option value="ACHETER">ACHETER</option>
        <option value="LOUER">LOUER</option>
      </select>
      <input
        type="text"
        name="location"
        placeholder="Où voulez-vous vivre ?"
        value={filters.location}
        onChange={handleChange}
        className="search-input"
      />
      <div className="divider" />

      <select
        name="propertyType"
        value={filters.propertyType}
        onChange={handleChange}
        className="filter-dropdown"
      >
        <option value="">Type de bien</option>
        <option value="Appartement">Appartement</option>
        <option value="Maison">Maison</option>
        <option value="Local professionnel">Local professionnel</option>
        <option value="Commerce">Commerce</option>
        <option value="Annexe">Annexe</option>
        <option value="Immeuble">Immeuble</option>
        <option value="Neuf">Neuf</option>
        <option value="Professionnel">Professionnel</option>
        <option value="Terrain">Terrain</option>
        <option value="Marina">Marina</option>
        <option value="Divers">Divers</option>
      </select>
      <div className="divider" />

      <select
        name="rooms"
        value={filters.rooms}
        onChange={handleChange}
        className="filter-dropdown"
      >
        <option value="">Nombre de pièces</option>
        <option value="1">1 pièce</option>
        <option value="2">2 pièces</option>
        <option value="3">3 pièces</option>
        <option value="4">4 pièces</option>
        <option value="5">5 pièces et +</option>
      </select>
      <div className="divider" />

      <input
        type="number"
        name="minSurface"
        placeholder="Surface min. (m²)"
        value={filters.minSurface}
        onChange={handleChange}
        className="search-input"
      />
      <div className="divider" />

      <input
        type="number"
        name="maxPrice"
        placeholder="Budget max."
        value={filters.maxPrice}
        onChange={handleChange}
        className="search-input"
      />
      <div className="divider" />

      <button className="filter-submit" type="button" onClick={handleReset}>
        Réinitialiser
      </button>
    </div>
  )
}

export default Filter