import React from "react";
import { Link } from 'react-router-dom';

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'

//style
import './SearchBar.css'
  
function SearchBar() {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search..." className="search-input" />
            <button className="search-button">Search</button>
        </div>
    );
}

export default SearchBar;