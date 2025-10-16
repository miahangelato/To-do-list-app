import { useEffect, useState } from 'react'
import { useUserContext } from '../context/UserContext'
import SignInForm from '../components/Auth/SignInForm'
import SignUpForm from '../components/Auth/SignUpForm'
import Loader from '../components/Loader'
import '../styles/LoginPage.css'

const LoginPage = () => {
  const { user, isAuthenticated, loading } = useUserContext()
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      // User is already logged in
    }
  }, [isAuthenticated, user])

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
  }

  if (loading) {
    return <Loader />
  }

  // If user is authenticated, this component shouldn't render (App handles routing)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="login-container">
      {isRegisterMode ? (
        <SignUpForm onToggleMode={toggleMode} />
      ) : (
        <SignInForm onToggleMode={toggleMode} />
      )}
      
      {/* Background Effects */}
      <div className="background-effects">
        <div className="glow-orb glow-orb-1"></div>
        <div className="glow-orb glow-orb-2"></div>
        <div className="glow-orb glow-orb-3"></div>
      </div>
    </div>
  )
}

export default LoginPage