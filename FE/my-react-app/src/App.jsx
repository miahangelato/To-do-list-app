import { UserProvider, useUserContext } from './context/UserContext'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import './App.css'

function AppContent() {
  const { isAuthenticated, loading } = useUserContext()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return isAuthenticated ? <TodoPage /> : <LoginPage />
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
