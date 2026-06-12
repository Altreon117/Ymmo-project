import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import TransactionCardClient from '../../components/TransactionCardClient'
import { useAuth } from '../../context/AuthContext'
import { fetchClientTransactions } from '../../api'

function MyTransactionClient() {
  const { user } = useAuth()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (user) {
      fetchClientTransactions(user.id).then(setTransactions).catch(console.error)
    }
  }, [user])

  return (
    <>
      <Header />
      <section id="center">
        <h1>Mes Transactions</h1>
        <div style={{ marginTop: '20px' }}>
          {transactions.length === 0 ? <p>Aucune proposition en cours.</p> : null}
          {transactions.map(t => <TransactionCardClient key={t.id} transaction={t} />)}
        </div>
      </section>
    </>
  )
}

export default MyTransactionClient