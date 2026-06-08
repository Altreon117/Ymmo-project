from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

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

@router.get("/", response_model=List[BienOut])
def lire_les_biens(db: Session = Depends(get_db)):
    return db.query(Bien).all()

@router.post("/", response_model=BienOut)
def creer_un_bien(bien_entrant: BienCreate, db: Session = Depends(get_db)):
    nouveau_bien = Bien(**bien_entrant.model_dump()) 
    db.add(nouveau_bien)
    db.commit()
    db.refresh(nouveau_bien)
    return nouveau_bien