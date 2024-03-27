import React from 'react'
import SignupSection from '../components/auth/SignupSection'
import useLogoutValidation from '../hooks/useLogoutValidation'

function SignupPage() {
  useLogoutValidation()
  return (
    <div><SignupSection/></div>
  )
}

export default SignupPage