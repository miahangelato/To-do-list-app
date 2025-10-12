import { useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import LoginForm from '../components/Auth/LoginForm'
import '../styles/LoginPage.css'

const LoginPage = () => {
  const { user, isAuthenticated, loading } = useUserContext()

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User is already logged in:', user)
    }
  }, [isAuthenticated, user])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // If user is authenticated, this component shouldn't render (App handles routing)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="login-container">
      <LoginForm />
      
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