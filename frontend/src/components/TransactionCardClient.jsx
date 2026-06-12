import React from 'react'

function TransactionCardClient({ transaction }) {
  const statut = transaction.date_vente ? "✅ Acceptée (Vendue)" : "⏳ En attente de réponse"
  
  return (
    <div className="estate-card" style={{ padding: '15px', marginBottom: '15px' }}>
      <h3>Bien n°{transaction.bien_id}</h3>
      <p>Prix proposé : <strong>{transaction.prix_final} €</strong></p>
      <p>Statut : <strong>{statut}</strong></p>
    </div>
  )
}

export default TransactionCardClient