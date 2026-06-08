from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String)
    email = Column(String, unique=True, index=True)
    mot_de_passe_hash = Column(String)
    role = Column(String)
    agence_id = Column(Integer, ForeignKey("agences.id"), nullable=True)

    agence = relationship("Agence", back_populates="utilisateurs")