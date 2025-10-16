import { useState } from "react"
import { useTaskContext } from "../../context/TaskContext"
import { TASK_FILTERS } from "../../constant/TaskConstant"

const TaskListView = () => {
  const { filteredTasks, loading, error, filter, updateTask, deleteTask } = useTaskContext()
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ title: "", description: "", dueDate: "", dueTime: "" })

  const handleToggleComplete = async (task) => {
    await updateTask(task.id, { completed: !task.completed })
  }

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteTask(taskId)
    }
  }

  const startEdit = (task) => {
    setEditingId(task.id)
    
    // Parse existing due date
    let dateStr = ""
    let timeStr = ""
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate)
      // Format date as YYYY-MM-DD
      dateStr = dueDate.toISOString().split('T')[0]
      // Format time as HH:MM
      timeStr = dueDate.toTimeString().slice(0, 5)
    }
    
    setEditData({ 
      title: task.title, 
      description: task.description || "",
      dueDate: dateStr,
      dueTime: timeStr
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditData({ title: "", description: "", dueDate: "", dueTime: "" })
  }

  const saveEdit = async (taskId) => {
    const updateData = {
      title: editData.title.trim(),
      description: editData.description.trim() || null,
    }
    
    // Only update dueDate if both date and time are provided
    if (editData.dueDate && editData.dueTime) {
      const dateTime = `${editData.dueDate}T${editData.dueTime}:00`
      updateData.dueDate = new Date(dateTime).toISOString()
    }
    
    await updateTask(taskId, updateData)
    setEditingId(null)
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true 
    })
  }

  if (loading && filteredTasks.length === 0) {
    return (
      <div className="list-view-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading tasks...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="list-view-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <div className="error-title">Error loading tasks</div>
          <div className="error-message">{error}</div>
        </div>
      </div>
    )
  }

  if (filteredTasks.length === 0) {
    const emptyMessages = {
      [TASK_FILTERS.ALL]: {
        icon: "📝",
        title: "No tasks yet",
        message: "Ready to be productive? Create your first task!",
      },
      [TASK_FILTERS.ACTIVE]: {
        icon: "🎉",
        title: "All done!",
        message: "No active tasks. You've completed everything!",
      },
      [TASK_FILTERS.COMPLETED]: {
        icon: "🎯",
        title: "Keep going!",
        message: "No completed tasks yet. Start crushing your goals!",
      },
    }

    const emptyState = emptyMessages[filter] || emptyMessages[TASK_FILTERS.ALL]

    return (
      <div className="list-view-container">
        <div className="empty-card">
          <div className="empty-icon">{emptyState.icon}</div>
          <h3 className="empty-title">{emptyState.title}</h3>
          <p className="empty-message">{emptyState.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="list-view-container">
      <div className="list-view-card">
        <div className="list-header">
          <h3 className="list-title">📋 Task List</h3>
          <span className="task-count">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="task-list-items">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
              {editingId === task.id ? (
                <div className="task-edit-mode">
                  <div className="edit-field">
                    <label className="edit-label">TITLE</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className="edit-input-inline"
                      placeholder="Task title"
                    />
                  </div>
                  
                  <div className="edit-field">
                    <label className="edit-label">DESCRIPTION</label>
                    <textarea
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      className="edit-textarea-inline"
                      placeholder="Description"
                      rows={3}
                    />
                  </div>
                  
                  <div className="edit-field">
                    <label className="edit-label">DUE DATE</label>
                    <input
                      type="datetime-local"
                      value={editData.dueDate && editData.dueTime ? `${editData.dueDate}T${editData.dueTime}` : ''}
                      onChange={(e) => {
                        const [date, time] = e.target.value.split('T')
                        setEditData({ ...editData, dueDate: date, dueTime: time })
                      }}
                      className="edit-input-inline"
                    />
                  </div>
                  
                  <div className="edit-actions-inline">
                    <button onClick={cancelEdit} className="btn-cancel-inline">
                      ✕ Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(task.id)}
                      disabled={!editData.title.trim() || !editData.dueDate || !editData.dueTime}
                      className="btn-save-inline"
                    >
                      💾 Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="task-checkbox-area">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task)}
                      className="task-checkbox-list"
                      id={`task-${task.id}`}
                    />
                    <label htmlFor={`task-${task.id}`} className="checkbox-label-list">
                      <span className="checkbox-icon-list">✓</span>
                    </label>
                  </div>

                  <div className="task-content-area">
                    <h4 className="task-item-title">{task.title}</h4>
                    {task.description && (
                      <p className="task-item-description">{task.description}</p>
                    )}
                    <div className="task-meta">
                      <span className="task-date">
                        🗓️ {formatDateTime(task.dueDate)}
                      </span>
                      <span className={`task-status ${task.completed ? "status-completed" : "status-active"}`}>
                        {task.completed ? "Completed" : "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="task-actions-area">
                    <button
                      onClick={() => startEdit(task)}
                      className="action-btn-list edit"
                      title="Edit task"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="action-btn-list delete"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TaskListView
