from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Bien(Base):
    __tablename__ = "biens"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String, index=True)
    description = Column(String)
    type_bien = Column(String)
    prix = Column(Float)
    surface = Column(Float)
    ville = Column(String)
    statut = Column(String, default="Disponible")
    agence_id = Column(Integer, ForeignKey("agences.id"))
    nbr_pieces = Column(Integer)
    type_article = Column(String, default="ACHETER") # <--- NOUVELLE COLONNE

    agence = relationship("Agence", back_populates="biens")