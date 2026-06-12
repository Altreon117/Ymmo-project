from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionOut
from datetime import datetime

router = APIRouter(prefix="/transactions", tags=["Transactions"])

# Route pour CRÉER une proposition (Celle qui bloque ton BuyForm !)
@router.post("/", response_model=TransactionOut)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    nouvelle_transaction = Transaction(
        bien_id=transaction.bien_id,
        client_id=transaction.client_id,
        agent_id=transaction.agent_id,
        prix_final=transaction.prix_final,
        date_vente=None # On force à vide tant que l'employé n'a pas dit "Vendre"
    )
    db.add(nouvelle_transaction)
    db.commit()
    db.refresh(nouvelle_transaction)
    return nouvelle_transaction

# Route pour voir les transactions d'un CLIENT
@router.get("/client/{client_id}", response_model=list[TransactionOut])
def get_client_transactions(client_id: int, db: Session = Depends(get_db)):
    return db.query(Transaction).filter(Transaction.client_id == client_id).all()

# Route pour l'EMPLOYÉ (Voir les propositions en attente)
@router.get("/employe/attente", response_model=list[TransactionOut])
def get_employe_transactions(db: Session = Depends(get_db)):
    # On renvoie uniquement celles qui n'ont pas encore de date_vente
    return db.query(Transaction).filter(Transaction.date_vente == None).all()

# Route pour l'EMPLOYÉ : Accepter la vente
@router.put("/{transaction_id}/accepter")
def accepter_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction non trouvée")
    
    transaction.date_vente = datetime.utcnow() # On enregistre la date du jour !
    db.commit()
    return {"message": "Transaction acceptée et vendue !"}

# Route pour l'EMPLOYÉ : Refuser la vente (Supprimer)
@router.delete("/{transaction_id}")
def refuser_transaction(transaction_id: int, db: Session = Depends(get_db)):
    transaction = db.query(Transaction).filter(Transaction.id == transaction_id).first()
    if not transaction:
        raise HTTPException(status_code=404, detail="Transaction non trouvée")
    
    db.delete(transaction)
    db.commit()
    return {"message": "Transaction refusée et supprimée"}