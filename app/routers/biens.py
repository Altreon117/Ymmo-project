from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

from app.database import SessionLocal
from app.models.bien import Bien
from app.schemas.bien import BienCreate, BienOut

router = APIRouter(prefix="/biens", tags=["Biens Immobiliers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[BienOut])
def lire_les_biens(db: Session = Depends(get_db)):
    return db.query(Bien).all()

@router.post("/", response_model=BienOut)
def creer_un_bien(bien_entrant: BienCreate, db: Session = Depends(get_db)):
    nouveau_bien = Bien(**bien_entrant.model_dump()) 
    db.add(nouveau_bien)
    db.commit()
    db.refresh(nouveau_bien)
    return nouveau_bien

@router.get("/recherche")
def rechercher_biens(
    ville: Optional[str] = None,
    prix_min: Optional[float] = None,
    prix_max: Optional[float] = None,
    surface_min: Optional[float] = None,
    db: Session = Depends(get_db)
):
    """
    Recherche dynamique de biens immobiliers avec filtres optionnels.
    """
    # 1. On initialise la requête de base (SELECT * FROM biens)
    requete = db.query(Bien)

    # 2. On ajoute les filtres (les clauses WHERE) uniquement si l'utilisateur les demande
    if ville:
        # ilike permet de chercher sans se soucier des majuscules/minuscules
        requete = requete.filter(Bien.ville.ilike(f"%{ville}%"))
    
    if prix_min:
        requete = requete.filter(Bien.prix >= prix_min)
        
    if prix_max:
        requete = requete.filter(Bien.prix <= prix_max)
        
    if surface_min:
        requete = requete.filter(Bien.surface >= surface_min)

    # 3. On exécute la requête finale
    resultats = requete.all()
    
    return {
        "total_trouve": len(resultats),
        "resultats": resultats
    }