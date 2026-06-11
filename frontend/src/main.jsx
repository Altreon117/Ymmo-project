import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'

import App from './App.jsx'

import Test from './pages/Test.jsx'
import IndexClient from './pages/Client/IndexClient.jsx'
import MyAccountClient from './pages/Client/MyAccountClient.jsx'
import MyAccountEmploye from './pages/Employe/MyAccountEmploye.jsx'
import Catalogue from './pages/EstateBoard.jsx'
import Agencies from './pages/Agencies.jsx'
import EstateDetails from './pages/EstateDetails.jsx'
import EstateManager from './pages/Employe/EstateManager.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/EstateBoard" element={<Catalogue />} />
        <Route path="/Agencies" element={<Agencies />} />
        <Route path="/EstateDetails" element={<EstateDetails />} />
        <Route path="/MyAccountClient" element={<MyAccountClient />} />
        <Route path="/MyAccountEmploye" element={<MyAccountEmploye />} />
        <Route path="/EstateManager" element={<EstateManager />} />
        <Route path="/Test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
