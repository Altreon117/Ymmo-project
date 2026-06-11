from pydantic import BaseModel
from typing import Optional

class BienBase(BaseModel):
    titre: str
    description: Optional[str] = None
    type_bien: str
    prix: float
    surface: float
    ville: str
    statut: str = "Disponible"
    agence_id: int

class BienCreate(BienBase):
    pass

class BienOut(BienBase):
    id: int
    model_config = {"from_attributes": True}