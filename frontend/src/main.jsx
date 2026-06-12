import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

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

import IndexEmploye from './pages/Employe/IndexEmploye.jsx'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/EstateBoard" element={<Catalogue />} />
          <Route path="/Agencies" element={<Agencies />} />
          <Route path="/EstateDetails/:id" element={<EstateDetails />} />

          {/* Client routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute requiredRole="client">
                <IndexClient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyAccountClient"
            element={
              <ProtectedRoute requiredRole="client">
                <MyAccountClient />
              </ProtectedRoute>
            }
          />

          {/* Employee routes */}
          <Route
            path="/IndexEmploye"
            element={
              <ProtectedRoute requiredRole="employe">
                <IndexEmploye />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyAccountEmploye"
            element={
              <ProtectedRoute requiredRole="employe">
                <MyAccountEmploye />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EstateManager"
            element={
              <ProtectedRoute requiredRole="employe">
                <EstateManager />
              </ProtectedRoute>
            }
          />

          {/* Test routes */}
          <Route path="/Test" element={<Test />} />
          <Route path="/App" element={<App />} />

          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
