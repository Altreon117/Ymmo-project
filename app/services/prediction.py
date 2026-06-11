import pandas as pd
from sklearn.linear_model import LinearRegression
from app.database import engine
import warnings

# On ignore les petits avertissements
warnings.filterwarnings("ignore", category=UserWarning)

def estimer_prix(surface_demandee: float):
    """
    Entraîne un modèle sur les données actuelles de la BDD 
    et retourne une estimation de prix pour une surface donnée.
    """
    # 1. Récupération des données depuis PostgreSQL
    requete_sql = "SELECT surface, prix FROM biens"
    df = pd.read_sql(requete_sql, engine)

    if df.empty:
        return None

    # 2. Entraînement de l'IA (Régression Linéaire)
    X = df[['surface']]
    y = df['prix']

    modele = LinearRegression()
    modele.fit(X, y)

    # 3. Prédiction
    prix_estime = modele.predict([[surface_demandee]])
    
    # On retourne le prix arrondi à 2 décimales
    return round(prix_estime[0], 2)