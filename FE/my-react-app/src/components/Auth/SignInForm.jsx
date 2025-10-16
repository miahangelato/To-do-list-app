import { useState, useEffect } from 'react'
import { useUserContext } from '../../context/UserContext'

const SignInForm = ({ onToggleMode }) => {
  const {
    loading,
    error,
    handleLogin,
    clearError
  } = useUserContext()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [validationError, setValidationError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    clearError()
    setValidationError('')
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
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
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      const result = await handleLogin(formData)
      if (result.success) {
        // Login successful
      }
    } catch (err) {
      // Form submission error
    }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-card">
      {/* Header */}
      <div className="login-header">
        <h2>Sign In</h2>
        <p>Access your account</p>
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
              autoComplete="current-password"
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


        {/* General Error Display */}
        {(error || (validationError && !validationError.toLowerCase().includes('email') && !validationError.toLowerCase().includes('password'))) && (
          <div className="error-message show">
            {error || validationError}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className={`login-btn btn ${loading ? 'loading' : ''}`} disabled={loading}>
          <span className="btn-text">
            {loading ? 'Please wait...' : 'Sign In'}
          </span>
          <span className="btn-loader"></span>
          <span className="btn-glow"></span>
        </button>
      </form>

      {/* Divider */}
      <div className="divider">
        <span>or</span>
      </div>

      {/* Sign up Link */}
      <div className="signup-link">
        <p>
          New here?{' '}
          <a href="#" onClick={(e) => { e.preventDefault(); onToggleMode(); }}>
            Create an account
          </a>
        </p>
      </div>
    </div>
  )
}

export default SignInForm
