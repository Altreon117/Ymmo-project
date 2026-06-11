from faker import Faker
import random
from app.database import SessionLocal
from app.models.agence import Agence
from app.models.bien import Bien
from app.models.user import User

fake = Faker('fr_FR')
db = SessionLocal()

def seed_database():
    print("====== Nettoyage des anciennes données... ======")
    # On supprime les anciens biens et les anciennes agences pour repartir à zéro
    db.query(Bien).delete()
    db.query(Agence).delete()
    db.commit()

    print("====== Début de la nouvelle injection logique... ======")

    # --- 1. CRÉATION DES AGENCES ---
    agences_creees = []
    siege = Agence(nom="Ymmo Siège National", ville="Aix-en-Provence")
    db.add(siege)
    agences_creees.append(siege)

    for i in range(1, 13):
        ville_aleatoire = fake.city()
        agence = Agence(nom=f"Ymmo {ville_aleatoire}", ville=ville_aleatoire)
        db.add(agence)
        agences_creees.append(agence)
    
    db.commit()

    # --- 2. CRÉATION DES BIENS IMMOBILIERS LOGIQUES ---
    types_de_biens = ["Maison", "Appartement", "Local professionnel"]
    
    for i in range(100): # On passe à 100 biens pour donner plus d'exemples à l'IA
        agence_aleatoire = random.choice(agences_creees)
        
        # LA MAGIE EST ICI : On crée une vraie corrélation !
        surface_choisie = round(random.uniform(20.0, 200.0), 1)
        # On dit qu'en moyenne un m² vaut entre 3000€ et 4500€
        prix_logique = surface_choisie * random.uniform(3000.0, 4500.0) 
        
        nouveau_bien = Bien(
            titre=fake.catch_phrase(),
            description=fake.text(max_nb_chars=200),
            type_bien=random.choice(types_de_biens),
            prix=round(prix_logique, 2), # Le prix dépend maintenant de la surface
            surface=surface_choisie,     
            ville=agence_aleatoire.ville,
            statut=random.choice(["Disponible", "Vendu"]),
            agence_id=agence_aleatoire.id
        )
        db.add(nouveau_bien)
    
    db.commit()
    print("====== 100 Biens immobiliers logiques générés avec succès. ======")
    print("====== Base de données prête pour une vraie IA ! ======")

if __name__ == "__main__":
    seed_database()