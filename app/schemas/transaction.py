from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TransactionCreate(BaseModel):
    bien_id: int
    client_id: int
    agent_id: int
    prix_final: float

class TransactionOut(BaseModel):
    id: int
    bien_id: int
    client_id: int
    agent_id: int
    prix_final: float
    date_vente: Optional[datetime] = None

    model_config = {"from_attributes": True}