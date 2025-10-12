import { useState, useEffect } from 'react'
import { useUserContext } from '../../context/UserContext'

const LoginForm = () => {
  const {
    loading,
    error,
    handleLogin,
    handleRegister,
    clearError
  } = useUserContext()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    clearError()
    setValidationError('')
  }, [isRegisterMode])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear errors when user starts typing
    if (error) clearError()
    if (validationError) setValidationError('')
  }

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setValidationError('All fields are required')
      return false
    }
    
    if (formData.email && !formData.email.includes('@')) {
      setValidationError('Please enter a valid email address')
      return false
    }
    
    if (formData.password.length < 3) {
      setValidationError('Password must be at least 3 characters long')
      return false
    }
    
    if (isRegisterMode && formData.password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      if (isRegisterMode) {
        const result = await handleRegister(formData)
        if (result.success) {
          alert('Registration successful! Please login.')
          setIsRegisterMode(false)
          setFormData({ email: '', password: '' })
          setConfirmPassword('')
        }
      } else {
        const result = await handleLogin(formData)
        if (result.success) {
          console.log('Login successful')
        }
      }
    } catch (err) {
      console.error('Form submission error:', err)
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setFormData({ email: '', password: '' })
    setConfirmPassword('')
    clearError()
    setValidationError('')
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-card">
      {/* Header */}
      <div className="login-header">
        <h2>{isRegisterMode ? 'Create Account' : 'Sign In'}</h2>
        <p>{isRegisterMode ? 'Join us today' : 'Access your account'}</p>
      </div>
      
      {/* Login Form */}
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="form-group">
          <div className="input-wrapper">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
            />
            <label htmlFor="email">Email</label>
            <span className="input-line"></span>
          </div>
          {validationError && validationError.toLowerCase().includes('email') && (
            <span className="error-message show">{validationError}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <div className="input-wrapper password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              autoComplete={isRegisterMode ? 'new-password' : 'current-password'}
            />
            <label htmlFor="password">Password</label>
            <button 
              type="button" 
              className="password-toggle" 
              onClick={togglePassword}
              aria-label="Toggle password visibility"
            >
              <span className={`toggle-icon ${showPassword ? 'show-password' : ''}`}></span>
            </button>
            <span className="input-line"></span>
          </div>
          {validationError && validationError.toLowerCase().includes('password') && (
            <span className="error-message show">{validationError}</span>
          )}
        </div>

        {/* Confirm Password Field (Register Mode) */}
        {isRegisterMode && (
          <div className="form-group">
            <div className="input-wrapper">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (validationError) setValidationError('')
                }}
                required
                autoComplete="new-password"
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span className="input-line"></span>
            </div>
          </div>
        )}

        {/* Form Options (Login Mode Only) */}
        {!isRegisterMode && (
          <div className="form-options">
            <div className="remember-wrapper">
              <input 
                type="checkbox" 
                id="remember" 
                name="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
          </div>
        )}

        {/* General Error Display */}
        {(error || (validationError && !validationError.toLowerCase().includes('email') && !validationError.toLowerCase().includes('password'))) && (
          <div className="error-message show">
            {error || validationError}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={`login-btn btn ${loading ? 'loading' : ''}`} disabled={loading}>
          <span className="btn-text">
            {loading ? 'Please wait...' : (isRegisterMode ? 'Create Account' : 'Sign In')}
          </span>
          <span className="btn-loader"></span>
          <span className="btn-glow"></span>
        </button>
      </form>

      {/* Divider (Login Mode Only) */}
      {!isRegisterMode && (
        <div className="divider">
          <span>or</span>
        </div>
      )}

      {/* Sign up / Sign in Link */}
      <div className="signup-link">
        <p>
          {isRegisterMode ? 'Already have an account?' : 'New here?'}{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
            {isRegisterMode ? 'Sign In' : 'Create an account'}
          </a>
        </p>
      </div>
                <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
    </div>
  )
}

export default LoginForm
