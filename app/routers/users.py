import hashlib
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserOut

router = APIRouter(prefix="/users", tags=["Utilisateurs"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    nouveau_user = User(
        nom=user.nom,
        email=user.email,
        mot_de_passe_hash=hash_password(user.password),
        role=user.role,
    )
    db.add(nouveau_user)
    db.commit()
    db.refresh(nouveau_user)
    return nouveau_user


@router.post("/login")
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user or user.mot_de_passe_hash != hash_password(credentials.password):
        raise HTTPException(status_code=401, detail="Identifiants invalides")

    return {
        "id": user.id,
        "nom": user.nom,
        "email": user.email,
        "role": user.role,
    }
