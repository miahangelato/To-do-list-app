import { UserProvider, useUserContext } from './context/UserContext'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import Loader from './components/Loader'
import './App.css'

function AppContent() {
  const { isAuthenticated, loading } = useUserContext()

  if (loading) {
    return <Loader />
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