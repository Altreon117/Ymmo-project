from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class Agence(Base):
    __tablename__ = "agences"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    ville = Column(String)

    utilisateurs = relationship("User", back_populates="agence")
    biens = relationship("Bien", back_populates="agence")