from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.agence import Agence
from app.models.user import User

# On crée le routeur dédié aux agences
router = APIRouter(
    prefix="/agences",
    tags=["Agences"]
)

@router.get("/")
def lister_agences(db: Session = Depends(get_db)):
    """
    Retourne la liste de toutes les agences Ymmo (Siège + 12 agences).
    """
    agences = db.query(Agence).all()
    return agences