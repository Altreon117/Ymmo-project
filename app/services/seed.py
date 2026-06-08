from faker import Faker
import random
from app.database import SessionLocal
from app.models.agence import Agence
from app.models.bien import Bien
from app.models.user import User

# Configuration de Faker pour générer des données réalistes en français
fake = Faker('fr_FR')

# Ouverture d'une session avec la base de données PostgreSQL
db = SessionLocal()

def seed_database():
    print("Début de l'injection des fausses données...")

    # --- 1. CRÉATION DES AGENCES ---
    agences_creees = []
    
    # Création du Siège Social exigé par le cahier des charges
    siege = Agence(nom="Ymmo Siège National", ville="Aix-en-Provence")
    db.add(siege)
    agences_creees.append(siege)

    # Création des 12 agences réparties sur le territoire national
    for i in range(1, 13):
        ville_aleatoire = fake.city()
        agence = Agence(nom=f"Ymmo {ville_aleatoire}", ville=ville_aleatoire)
        db.add(agence)
        agences_creees.append(agence)
    
    # Sauvegarde des agences pour générer leurs IDs (1 à 13) dans la base
    db.commit()
    print("13 Agences créées (1 Siège à Aix-en-Provence + 12 Agences).")


    # --- 2. CRÉATION DES BIENS IMMOBILIERS ---
    types_de_biens = ["Maison", "Appartement", "Local professionnel"]
    
    # Création de 50 biens immobiliers aléatoires
    for i in range(50):
        agence_aleatoire = random.choice(agences_creees) # On rattache le bien à une agence au hasard
        
        nouveau_bien = Bien(
            titre=fake.catch_phrase(),
            description=fake.text(max_nb_chars=200),
            type_bien=random.choice(types_de_biens),
            prix=round(random.uniform(100000.0, 850000.0), 2),
            surface=round(random.uniform(20.0, 300.0), 1),
            ville=agence_aleatoire.ville, # Le bien est logiquement situé dans la ville de son agence
            statut=random.choice(["Disponible", "Vendu"]),
            agence_id=agence_aleatoire.id # La fameuse clé étrangère qui posait problème !
        )
        db.add(nouveau_bien)
    
    # Sauvegarde finale de tous les biens
    db.commit()
    print("50 Biens immobiliers générés avec succès.")
    
    print("Injection terminée ! Ta base de données PostgreSQL est prête à être analysée.")

# Point d'entrée pour lancer la fonction
if __name__ == "__main__":
    seed_database()