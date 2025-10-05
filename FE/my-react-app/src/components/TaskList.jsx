import { useTaskContext } from '../context/TaskContext'
import TaskItem from './TaskItem'
import { TASK_FILTERS } from '../constant/TaskConstant'

const TaskList = () => {
  const { filteredTasks, loading, error, filter } = useTaskContext()

  if (loading && filteredTasks.length === 0) {
    return (
      <div className="neon-card loading-card">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading your tasks...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="neon-card error-card">
        <div className="error-icon">⚠️</div>
        <div className="error-title">Error loading tasks</div>
        <div className="error-message">{error}</div>
      </div>
    )
  }

  if (filteredTasks.length === 0) {
    const emptyMessages = {
      [TASK_FILTERS.ALL]: {
        icon: "📝",
        title: "No tasks yet",
        message: "Ready to be productive? Create your first task above!"
      },
      [TASK_FILTERS.ACTIVE]: {
        icon: "🎉",
        title: "All done!",
        message: "No active tasks. You've completed everything!"
      },
      [TASK_FILTERS.COMPLETED]: {
        icon: "🎯",
        title: "Keep going!",
        message: "No completed tasks yet. Start crushing your goals!"
      }
    }

    const emptyState = emptyMessages[filter] || emptyMessages[TASK_FILTERS.ALL]

    return (
      <div className="neon-card empty-card">
        <div className="empty-content">
          <div className="empty-icon">{emptyState.icon}</div>
          <h3 className="empty-title">{emptyState.title}</h3>
          <p className="empty-message">{emptyState.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h3 className="tasks-title">Your Tasks</h3>
        <span className="tasks-count">{filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="tasks-grid">
        {filteredTasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  )
}

export default TaskList