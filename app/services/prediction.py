import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from app.database import engine
import warnings

# On ignore les petits avertissements de Scikit-Learn pour garder un terminal propre
warnings.filterwarnings("ignore", category=UserWarning)

def analyser_et_predire():
    print("Récupération des données depuis PostgreSQL...")
    
    # 1. EXTRACTION DES DONNÉES (SQL vers Pandas)
    # Grâce à SQLAlchemy (engine), Pandas lit la table d'un seul coup !
    requete_sql = "SELECT * FROM biens"
    df = pd.read_sql(requete_sql, engine)

    if df.empty:
        print("La base de données est vide.")
        return

    print(f"{len(df)} biens immobiliers chargés en mémoire.")

    # 2. ANALYSE DE DONNÉES (Pandas)
    prix_moyen = df['prix'].mean()
    surface_moyenne = df['surface'].mean()
    print("\n--- Statistiques Globales ---")
    print(f"Prix moyen : {prix_moyen:,.2f} €")
    print(f"Surface moyenne : {surface_moyenne:.2f} m²")

    # 3. MACHINE LEARNING (Scikit-Learn)
    print("\n--- Entraînement de l'IA (Régression Linéaire) ---")
    
    # Nos variables : on veut prédire le prix (y) à partir de la surface (X)
    X = df[['surface']]
    y = df['prix']

    # On coupe nos données : 80% pour l'entraînement, 20% pour vérifier si l'IA a bien appris
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # On crée et on entraîne le modèle
    modele = LinearRegression()
    modele.fit(X_train, y_train)

    # On évalue la précision du modèle (Le fameux score R²)
    score = modele.score(X_test, y_test)
    print(f"Précision du modèle (Score R²) : {score:.2f}")

    # 4. TEST EN DIRECT
    surface_test = 75.0
    prix_predit = modele.predict([[surface_test]])
    print(f"Pour un appartement de {surface_test} m², l'IA estime le prix à : {prix_predit[0]:,.2f} €")

if __name__ == "__main__":
    analyser_et_predire()