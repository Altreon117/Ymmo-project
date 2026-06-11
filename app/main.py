from fastapi import FastAPI
from app.database import engine, Base
from app.routers import biens, agences

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ymmo API", version="1.0")

app.include_router(biens.router)
app.include_router(agences.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de la plateforme Ymmo."}