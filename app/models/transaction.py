from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from datetime import datetime
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    bien_id = Column(Integer, ForeignKey("biens.id"))
    client_id = Column(Integer, ForeignKey("users.id"))
    agent_id = Column(Integer, ForeignKey("users.id"))
    prix_final = Column(Float)
    date_vente = Column(DateTime, nullable=True)