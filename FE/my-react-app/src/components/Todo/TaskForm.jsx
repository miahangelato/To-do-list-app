import { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'

const TaskForm = () => {
  const { createTask, loading } = useTaskContext()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: ''
  })
  const [validationError, setValidationError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (validationError) setValidationError('')
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setValidationError('Task title is required')
      return false
    }
    if (!formData.dueDate) {
      setValidationError('Due date is required')
      return false
    }
    if (!formData.dueTime) {
      setValidationError('Due time is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    // Combine date and time (both are now required)
    const dateTime = `${formData.dueDate}T${formData.dueTime}:00`
    const dueDateTimeISO = new Date(dateTime).toISOString()
    
    const result = await createTask({
      title: formData.title.trim(),
      description: formData.description.trim() || null,
      dueDate: dueDateTimeISO
    })
    
    if (result.success) {
      setFormData({ title: '', description: '', dueDate: '', dueTime: '' })
      setValidationError('')
    }
  }

  return (
    <div className="neon-card">
      <div className="card-header">
        <div className="header-icon">✨</div>
        <h2 className="card-title">Add New Task</h2>
        <p className="card-subtitle">Create something amazing</p>
      </div>
      
      <form onSubmit={handleSubmit} className="neon-form">
        <div className="form-group">
          <div className="input-wrapper">
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="neon-input"
              required
            />
            <label htmlFor="title" className="neon-label">Task Title *</label>
            <span className="input-line"></span>
          </div>
        </div>
        
        <div className="form-group">
          <div className="input-wrapper">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="neon-textarea"
              placeholder=" "
            />
            <label htmlFor="description" className="neon-label">Description (Optional)</label>
            <span className="input-line"></span>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <div className="input-wrapper">
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="neon-input"
                required
              />
              <label htmlFor="dueDate" className="neon-label">Due Date *</label>
              <span className="input-line"></span>
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-wrapper">
              <input
                id="dueTime"
                name="dueTime"
                type="time"
                value={formData.dueTime}
                onChange={handleInputChange}
                className="neon-input"
                required
              />
              <label htmlFor="dueTime" className="neon-label">Due Time *</label>
              <span className="input-line"></span>
            </div>
          </div>
        </div>
        
        {validationError && (
          <div className="error-message show">
            {validationError}
          </div>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={`neon-btn primary ${loading ? 'loading' : ''}`}
        >
          <span className="btn-text">{loading ? 'Adding Task...' : '+ Add Task'}</span>
          <span className="btn-loader"></span>
          <span className="btn-glow"></span>
        </button>
      </form>
    </div>
  )
}

export default TaskForm
