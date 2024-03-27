import React from 'react'
import LoginSection from '../components/auth/LoginSection'
import useLogoutValidation from '../hooks/useLogoutValidation'

function LoginPage() {
  useLogoutValidation()
  return (
    <div>
      <LoginSection/>
    </div>
  )
}

export default LoginPage