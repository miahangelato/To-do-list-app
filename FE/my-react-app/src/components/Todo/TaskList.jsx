import { useState, useMemo } from "react"
import { useTaskContext } from "../../context/TaskContext"
import { TASK_FILTERS } from "../../constant/taskConstant"

const TaskList = () => {
  const { filteredTasks, loading, error, filter } = useTaskContext()
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Debug: Log tasks to see their structure
  console.log("📋 Filtered Tasks:", filteredTasks)
  console.log("📅 Tasks with due dates:", filteredTasks.filter(t => t.dueDate))

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    return { daysInMonth, startDayOfWeek, year, month }
  }

  const formatDate = (date) => {
    // Format date in local timezone as YYYY-MM-DD
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getTasksForDate = (date) => {
    const dateStr = formatDate(date)
    return filteredTasks.filter(task => {
      if (task.dueDate) {
        // Parse the UTC date but use local date components for comparison
        const taskDate = new Date(task.dueDate)
        const taskDateStr = formatDate(taskDate)
        return taskDateStr === dateStr
      }
      return false
    })
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const { daysInMonth, startDayOfWeek, year, month } = getDaysInMonth(currentMonth)

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentMonth(new Date())
  }

  const isToday = (day) => {
    const today = new Date()
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year
  }

  // Render calendar days
  const renderCalendarDays = () => {
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const tasksForDay = getTasksForDate(date)
      const hasIncompleteTasks = tasksForDay.some(task => !task.completed)
      
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${isToday(day) ? 'today' : ''} ${tasksForDay.length > 0 ? 'has-tasks' : ''}`}
        >
          <div className="day-number">{day}</div>
          {tasksForDay.length > 0 && (
            <div className="day-tasks">
              {tasksForDay.slice(0, 3).map((task, idx) => (
                <div 
                  key={task.id} 
                  className={`mini-task ${task.completed ? 'completed' : ''}`}
                  title={task.title}
                >
                  <span className="mini-task-time">
                    {task.dueDate ? new Date(task.dueDate).toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    }) : ''}
                  </span>
                  <span className="mini-task-title">{task.title}</span>
                </div>
              ))}
              {tasksForDay.length > 3 && (
                <div className="mini-task-more">+{tasksForDay.length - 3} more</div>
              )}
            </div>
          )}
          {hasIncompleteTasks && <div className="day-indicator"></div>}
        </div>
      )
    }

    return days
  }

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
        message: "Ready to be productive? Create your first task above!",
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
      <div className="calendar-view">
        <div className="calendar-header">
          <button onClick={previousMonth} className="nav-btn">←</button>
          <div className="month-info">
            <h2 className="month-title">{monthNames[month]} {year}</h2>
            <button onClick={goToToday} className="today-btn">Today</button>
          </div>
          <button onClick={nextMonth} className="nav-btn">→</button>
        </div>

        <div className="calendar-weekdays">
          {dayNames.map(day => (
            <div key={day} className="weekday-label">{day}</div>
          ))}
        </div>

        <div className="calendar-grid">
          {renderCalendarDays()}
        </div>

        <div className="calendar-legend">
          <span className="legend-item">
            <span className="legend-indicator today-indicator"></span> Today
          </span>
          <span className="legend-item">
            <span className="legend-indicator task-indicator"></span> Has Tasks
          </span>
          <span className="legend-item">
            📊 {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} scheduled
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskList

