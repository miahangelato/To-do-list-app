import React, { useState } from 'react'
import { useTaskContext } from '../context/TaskContext'

const TaskItem = ({ task, index = 0 }) => {
  const { updateTask, deleteTask, toggleTask, loading } = useTaskContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || ''
  })

  const handleToggle = async () => {
    await toggleTask(task.id, !task.completed)
  }

  const handleDelete = async () => {
    if (window.confirm('🗑️ Delete this task forever?')) {
      await deleteTask(task.id)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!editData.title.trim()) return
    
    const result = await updateTask(task.id, {
      title: editData.title.trim(),
      description: editData.description.trim() || null
    })
    
    if (result.success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || ''
    })
    setIsEditing(false)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'active'}`} 
         style={{ animationDelay: `${index * 0.1}s` }}>
      
      {/* Task Status Indicator */}
      <div className="task-status">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="neon-checkbox"
          id={`task-${task.id}`}
        />
        <label htmlFor={`task-${task.id}`} className="checkbox-custom">
          <span className="checkmark">✓</span>
        </label>
      </div>
      
      {/* Task Content */}
      <div className="task-content">
        {isEditing ? (
          <div className="task-edit-form">
            <div className="input-wrapper">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="neon-input small"
                placeholder="Task title"
              />
              <span className="input-line"></span>
            </div>
            <div className="input-wrapper">
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="neon-textarea small"
                placeholder="Task description (optional)"
              />
              <span className="input-line"></span>
            </div>
          </div>
        ) : (
          <div className="task-display">
            <h3 className="task-title">{task.title}</h3>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <div className="task-meta">
              <span className="task-date">
                <span className="meta-icon">📅</span>
                {formatDate(task.createdAt)}
              </span>
              <span className="task-priority">
                <span className="priority-dot"></span>
                {task.completed ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Task Actions */}
      <div className="task-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              disabled={loading}
              className="action-btn save"
              title="Save changes"
            >
              <span>💾</span>
            </button>
            <button
              onClick={handleCancel}
              className="action-btn cancel"
              title="Cancel editing"
            >
              <span>❌</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="action-btn edit"
              title="Edit task"
            >
              <span>✏️</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="action-btn delete"
              title="Delete task"
            >
              <span>🗑️</span>
            </button>
          </>
        )}
      </div>
      
      {/* Neon Glow Effect */}
      <div className="task-glow"></div>
    </div>
  )
}

export default TaskItem