import React from 'react'
import useTokenValidation from '../hooks/useTokenValidation'
import Header from '../components/common/Header'

function MyBudgetsPage() {
    useTokenValidation()
  return (
    <div className="min-h-screen">
      <Header />
      <div>
        <CategoriesTab />
      </div>
    </div>
  )
}

export default MyBudgetsPage