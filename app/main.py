from fastapi import FastAPI
from app.database import engine, Base
from app.models import agence, user, bien, transaction
from app.routers import biens

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ymmo API")

app.include_router(biens.router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de la plateforme Ymmo."}