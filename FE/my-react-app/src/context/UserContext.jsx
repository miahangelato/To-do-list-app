import { createContext, useContext } from 'react'
import { useAuth } from '../hooks/UserHooks'

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const authState = useAuth()

  return (
    <UserContext.Provider value={authState}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error(
      'useUserContext must be used within a UserProvider'
    )
  }
  return context
}