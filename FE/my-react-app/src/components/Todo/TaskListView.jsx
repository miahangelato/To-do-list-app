import { useTaskContext } from "../../context/TaskContext"
import { TASK_FILTERS } from "../../constant/taskConstant"

const TaskListView = () => {
  const { filteredTasks, loading, error, filter, toggleTask, deleteTask } = useTaskContext()

  if (loading && filteredTasks.length === 0) {
    return (
      <div className="list-view-container">
        <div className="list-view-header">
          <h3 className="list-view-title">📋 Task List</h3>
        </div>
        <div className="neon-card loading-card">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading your tasks...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="list-view-container">
        <div className="list-view-header">
          <h3 className="list-view-title">📋 Task List</h3>
        </div>
        <div className="neon-card error-card">
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
        <div className="list-view-header">
          <h3 className="list-view-title">📋 Task List</h3>
        </div>
        <div className="neon-card empty-card">
          <div className="empty-content">
            <div className="empty-icon">{emptyState.icon}</div>
            <h3 className="empty-title">{emptyState.title}</h3>
            <p className="empty-message">{emptyState.message}</p>
          </div>
        </div>
      </div>
    )
  }

  const handleToggle = async (taskId, completed) => {
    await toggleTask(taskId, !completed)
  }

  const handleDelete = async (taskId) => {
    if (window.confirm('🗑️ Delete this task forever?')) {
      await deleteTask(taskId)
    }
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
    <div className="list-view-container">
      <div className="list-view-header">
        <h3 className="list-view-title">📋 Task List</h3>
        <span className="task-count-badge">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="task-list-items">
        {filteredTasks.map((task) => (
          <div 
            key={task.id} 
            className={`task-list-item ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-checkbox-wrapper">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id, task.completed)}
                className="task-checkbox"
                id={`task-check-${task.id}`}
              />
              <label htmlFor={`task-check-${task.id}`} className="checkbox-label">
                <span className="checkmark">✓</span>
              </label>
            </div>

            <div className="task-list-content">
              <h4 className="task-list-title">{task.title}</h4>
              {task.description && (
                <p className="task-list-description">{task.description}</p>
              )}
              <div className="task-list-meta">
                {task.dueDate && (
                  <span className="task-meta-item due">
                    <span className="meta-icon">⏰</span>
                    {formatDate(task.dueDate)}
                  </span>
                )}
                <span className={`task-status-badge ${task.completed ? 'completed' : 'active'}`}>
                  {task.completed ? '✓ Completed' : '○ Active'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(task.id)}
              className="task-delete-btn"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskListView
