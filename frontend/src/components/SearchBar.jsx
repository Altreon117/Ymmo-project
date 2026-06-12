import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

//style
import './SearchBar.css'
  
function SearchBar() {
    // État local pour stocker ce que l'utilisateur tape
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); 
        
        if (query.trim() !== "") {
            // CORRECTION ICI : On utilise le vrai chemin déclaré dans main.jsx
            navigate(`/EstateBoard?search=${encodeURIComponent(query)}`);
        } else {
            // CORRECTION ICI AUSSI
            navigate(`/EstateBoard`);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Rechercher une ville, un titre..." 
                className="search-input" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Rechercher</button>
        </form>
    );
}

export default SearchBar;