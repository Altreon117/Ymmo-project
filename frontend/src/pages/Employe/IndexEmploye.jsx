import { useState } from 'react'

//assets
import reactLogo from '/src/assets/react.svg'
import viteLogo from '/src/assets/vite.svg'
import heroImg from '/src/assets/hero.png'
import displayImg from '/src/assets/display.jpg'

//style
import '/src/App.css'
import './IndexEmploye.css'

//component
import Header from '/src/components/Header';
import Footer from '/src/components/Footer';
import SearchBar from '/src/components/SearchBar';
import EstateCard from '/src/components/EstateCard';
import Filter from '/src/components/Filter';
import { Link } from 'react-router-dom';

import HeaderEmploye from '../../components/HeaderEmploye'

function IndexEmploye() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderEmploye />
      <section id="center">
        <div className="DisplayContainer">
          <img src={displayImg} className="DisplayImg" alt="" />
          <div className="DisplayDirectionContainer">
            <h1 className="DisplayTitle">Trouvez votre futur chez-vous</h1>
            <p className="DisplayText">Découvrez notre sélection de biens immobiliers à vendre et à louer, adaptés à tous les budgets et styles de vie.</p>
            <div className="DisplayChoiceContainer">
              <div className="Choice1">
                <p className="DisplayButtonIndic">Je cherche un bien immobilier</p>
                <Link to="/EstateBoard" className="DisplayButton">ACHETER OU LOUER</Link>
              </div>
              <div className="Choice2">
                <p className="DisplayButtonIndic">J’estime mon appartement ou ma maison</p>
                <Link to="/EstateBoard" className="DisplayButton">ESTIMER MON BIEN</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section id="spacer"></section>
      <Footer />
    </>
  )
}

export default IndexEmploye
