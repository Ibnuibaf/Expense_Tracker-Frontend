import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import MyExpensesPage from './pages/MyExpensesPage'
import CategoriesPage from './pages/CategoriesPage'
import SharedWithMePage from './pages/SharedWithMePage'
import AddExpensePage from './pages/AddExpensePage'

function App() {

  return (
    <div className='bg-zinc-800/10'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/register" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard"element={<DashboardPage/>}/>
          <Route path="/add-expense" element={<AddExpensePage/>}/>
          <Route path="/my-expenses" element={<MyExpensesPage/>}/>
          <Route path="/categories"element={<CategoriesPage/>}/>
          <Route path="/shared-with-me"element={<SharedWithMePage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
