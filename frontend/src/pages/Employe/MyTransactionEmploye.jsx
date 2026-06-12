import React, { useEffect, useState } from 'react'
import HeaderEmploye from '../../components/HeaderEmploye'
import TransactionCardEmploye from '../../components/TransactionCardEmploye'
import { fetchEmployeTransactions, accepterTransaction, refuserTransaction } from '../../api'

function MyTransactionEmploye() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    chargerTransactions()
  }, [])

  const chargerTransactions = () => {
    fetchEmployeTransactions().then(setTransactions).catch(console.error)
  }

  const handleAccepter = async (id) => {
    if(window.confirm("Valider la vente ?")) {
      await accepterTransaction(id)
      chargerTransactions() // Recharge la liste
    }
  }

  const handleRefuser = async (id) => {
    if(window.confirm("Refuser cette offre et la supprimer ?")) {
      await refuserTransaction(id)
      chargerTransactions()
    }
  }

  return (
    <>
      <HeaderEmploye />
      <section id="center">
        <h1>Propositions d'Achat (En attente)</h1>
        <div style={{ marginTop: '20px' }}>
          {transactions.length === 0 ? <p>Aucune proposition à traiter.</p> : null}
          {transactions.map(t => (
            <TransactionCardEmploye 
              key={t.id} 
              transaction={t} 
              onAccepter={handleAccepter} 
              onRefuser={handleRefuser} 
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default MyTransactionEmploye