import { useState } from 'react'

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'

//style
import '/src/App.css'
import './EstateBoard.css'

//component
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import Filter from '/src/components/Filter';
import { Link } from 'react-router-dom';
import Map from '/src/components/Map';

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
    
      <Filter />

      <section id="center" style={{ padding: '0px' }}>
        <div className="RechercheContainer">
          <div className="Carte">
            <Map />
          </div>
          <div className="ListeBiens">
            <h1>Liste des biens immobiliers</h1>
            <p>3 biens trouvés</p>
            <div className="biensContainer">
              <p>z</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
