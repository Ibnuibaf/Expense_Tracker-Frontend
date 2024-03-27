import React from 'react'
import Header from '../components/common/Header'
import useTokenValidation from '../hooks/useTokenValidation'
import Charts from '../components/cards/Charts'
import DashboardBtns from '../components/common/DashboardBtns'

function DashboardPage() {
  useTokenValidation()
  return (
    <div className='h-screen'>
        <Header/>
        <div className='p-4'>
          <DashboardBtns/>
          <Charts/>
        </div>
    </div>
  )
}

export default DashboardPage