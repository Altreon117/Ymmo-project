import React from 'react'

function TransactionCardEmploye({ transaction, onAccepter, onRefuser }) {
  return (
    <div className="transEmploye-card" style={{ padding: '15px', marginBottom: '15px', borderLeft: '5px solid orange' }}>
      <h3>Proposition sur le Bien n°{transaction.bien_id}</h3>
      <p>Client ID : {transaction.client_id}</p>
      <p>Montant proposé : <strong>{transaction.prix_final} €</strong></p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <button onClick={() => onAccepter(transaction.id)} style={{ background: 'green', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Vendre
        </button>
        <button onClick={() => onRefuser(transaction.id)} style={{ background: 'red', color: 'white', padding: '8px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Refus
        </button>
      </div>
    </div>
  )
}

export default TransactionCardEmploye