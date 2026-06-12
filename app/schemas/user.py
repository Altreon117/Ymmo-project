from pydantic import BaseModel

class UserCreate(BaseModel):
    nom: str
    email: str
    password: str
    role: str = "client"

class UserLogin(BaseModel):
    email: str
    password: str

class UserLogout(BaseModel):
    user_id: int

class UserOut(BaseModel):
    id: int
    nom: str
    email: str
    role: str

    model_config = {"from_attributes": True}
