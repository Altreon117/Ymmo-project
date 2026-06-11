from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import biens, agences

app = FastAPI(title="API Ymmo", version="1.0")

# --- Configuration CORS (Le videur de l'API) ---
# On définit les adresses autorisées à discuter avec l'API
origines_autorisees = [
    "http://localhost:3000",     # Port classique pour React / Create React App
    "http://localhost:5173",     # Port classique pour Vite / Vue.js
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "*" # A ENLEVER AVANT DE PUSH
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origines_autorisees,
    allow_credentials=True,
    allow_methods=["*"],         # Autorise toutes les méthodes (GET, POST, PUT, DELETE...)
    allow_headers=["*"],         # Autorise tous les en-têtes
)

# On connecte nos routeurs
app.include_router(biens.router)
app.include_router(agences.router)