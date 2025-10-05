import { useState, useEffect } from 'react'
import { loginUser, registerUser, logoutUser } from '../api/UserAPI'
import { USER_STATUS, STORAGE_KEYS } from '../constant/UserConstant'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(USER_STATUS.IDLE)

  // Initialize user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER)
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = async (credentials) => {
    setLoading(true)
    setError(null)
    setStatus(USER_STATUS.LOADING)

    try {
      const response = await loginUser(credentials)
      
      if (response.success) {
        const userData = response.user
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData))
        
        setUser(userData)
        setStatus(USER_STATUS.SUCCESS)
        return { success: true, user: userData }
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed'
      setError(errorMessage)
      setStatus(USER_STATUS.ERROR)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (userData) => {
    setLoading(true)
    setError(null)
    setStatus(USER_STATUS.LOADING)

    try {
      const response = await registerUser(userData)
      
      if (response.success) {
        setStatus(USER_STATUS.SUCCESS)
        return { success: true, message: response.message }
      } else {
        throw new Error(response.message || 'Registration failed')
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed'
      setError(errorMessage)
      setStatus(USER_STATUS.ERROR)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    setError(null)

    try {
      await logoutUser()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear localStorage and state regardless of API call success
      localStorage.removeItem(STORAGE_KEYS.USER)
      setUser(null)
      setStatus(USER_STATUS.IDLE)
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
    setStatus(USER_STATUS.IDLE)
  }

  const isAuthenticated = !!user

  return {
    user,
    loading,
    error,
    status,
    isAuthenticated,
    
    setUser,
    setLoading,
    setError,
    setStatus,
    
    handleLogin,
    handleRegister,
    handleLogout,
    clearError
  }
}