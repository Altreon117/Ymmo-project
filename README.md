# Projet Ymmo - Plateforme Immobilière & Intelligence Artificielle

Bienvenue sur le dépôt du projet Ymmo. L'objectif de cette solution web est de centraliser la gestion des opérations d'achat et de vente de biens immobiliers pour le réseau Ymmo (1 siège social à Aix-en-Provence et 12 agences nationales).

Ce projet intègre également un moteur d'Intelligence Artificielle permettant d'analyser les tendances du marché et d'estimer le prix des biens.

---

## Sommaire
1. [Architecture Backend & Data Science](#1-architecture-backend--data-science)
2. [Interface Utilisateur (Frontend)](#2-interface-utilisateur-frontend)
3. [Infrastructure Réseau & Sécurité](#3-infrastructure-réseau--sécurité)
4. [Équipe](#4-équipe)

---

## 1. Architecture Backend & Data Science

L'API Restful a été développée en Python pour assurer des performances optimales et faciliter l'intégration de bibliothèques d'analyse de données et d'apprentissage automatique.

### 🛠 Technologies utilisées
* **Langage :** Python 3
* **Framework Web :** FastAPI (avec Uvicorn)
* **Base de données :** PostgreSQL & SQLAlchemy (ORM)
* **Data Science & IA :** Pandas, Scikit-Learn (Régression Linéaire)
* **Génération de données :** Faker

### Installation et Lancement (Local)

#### 1. **Cloner le dépôt :**
   ```bash
   git clone <URL_DU_DEPOT>
   cd Ymmo-project
   ```

#### 2. Environnement virtuel
**Sur Mac / Linux :**
```bash
python3 -m venv venv
source venv/bin/activate
```
**Sur Windows (PowerShell) :**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

#### 3. Dépendances
```bash
pip install -r requirements.txt
```

#### 4. Générer la base de données (Seeding)
```bash
python -m app.services.seed
```

#### 5. Lancer le serveur
```bash
uvicorn app.main:app --reload
```
L'API sera accessible sur : `http://127.0.0.1:8000`

### Routes Principales (Endpoints)
Une fois le serveur lancé, la documentation interactive complète (Swagger) est disponible sur `http://127.0.0.1:8000/docs`.

* **Agences :**
  * `GET /agences` : Liste les 13 agences du réseau.
* **Biens Immobiliers :**
  * `GET /biens` : Liste l'intégralité du catalogue.
  * `GET /biens/recherche` : Moteur de recherche multicritères en SQL (ville, prix_min, prix_max, surface_min).
* **Intelligence Artificielle :**
  * `GET /biens/estimation/{surface}` : Estime la valeur d'un bien immobilier en temps réel à l'aide d'un modèle prédictif Scikit-Learn entraîné sur la base de données actuelle.

*Note : L'API est configurée avec un middleware CORS autorisant les requêtes provenant d'applications Frontend locales (ports 3000 et 5173).*

---

## 2. Interface Utilisateur (Frontend)

> **Section en cours de développement** 

Cette section détaillera l'interface web (UI/UX) permettant aux clients et aux agents d'interagir avec la plateforme Ymmo. 
* L'application sera entièrement responsive (desktop, tablette, smartphone).
* Elle respectera les normes d'accessibilité (WCAG, W3C).

### Technologies utilisées
* *[À compléter]*
* *[À compléter]*

### Lancement du Frontend
* *[À compléter : commandes npm install, npm run dev, etc.]*

---

## 3. Infrastructure Réseau & Sécurité

> **Section en cours de développement** 

Cette section regroupera la documentation technique de l'architecture déployée pour relier le siège social et les 12 agences.

### Schéma d'architecture
* *[Lien vers le schéma réseau]*

### Composants de l'Infrastructure
* **Serveurs :** Déploiement sous Windows Server.
* **Réseau :** Configuration VPN/IPSec site à site, plan d'adressage IP.
* **Services :** Mise en place des services DNS, DHCP, NAT.
* **Sécurité & Droits :** Active Directory (AD), Stratégies de groupe (GPO) et Matrice des droits d'accès.

### Maquettes & Virtualisation
* Les environnements de test sont virtualisés via *[Préciser l'outil : VMware / VirtualBox]*.

---

## 4. Équipe

Projet réalisé dans le cadre de l'Unité de Formation B2 INFRA & DEV :
* **Lucie BARREZ** - Développement Backend, Base de données & Data Science
* **Raphaël PHAN** - *Développement Frontend / UI*
* **Thibaud TABARD** - *Infrastructure / Windows Server*
