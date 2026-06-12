import hashlib
import json
import base64
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin, UserLogout, UserOut

router = APIRouter(prefix="/users", tags=["Utilisateurs"])


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def create_token(user_id: int, role: str) -> str:
    """Create a simple base64 encoded token with user id and role"""
    token_data = {"id": user_id, "role": role}
    token_json = json.dumps(token_data)
    token = base64.b64encode(token_json.encode()).decode()
    return token


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
        connected=False,
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

    # Mark user as connected
    user.connected = True
    db.commit()

    # Create token
    token = create_token(user.id, user.role)

    return {
        "id": user.id,
        "nom": user.nom,
        "email": user.email,
        "role": user.role,
        "token": token,
    }

@router.post("/logout")
def logout_user(logout_data: UserLogout, db: Session = Depends(get_db)):
    """Mark user as disconnected"""
    user = db.query(User).filter(User.id == logout_data.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    user.connected = False
    db.commit()

    return {"message": "Déconnecté avec succès"}

