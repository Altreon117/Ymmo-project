#!/usr/bin/env python
"""Initialize database tables from SQLAlchemy models."""

from app.database import engine, Base
from app.models import user, agence, bien, transaction

def init_database():
    print("Création des tables...")
    Base.metadata.create_all(bind=engine)
    print("✓ Tables créées avec succès!")

if __name__ == "__main__":
    init_database()
