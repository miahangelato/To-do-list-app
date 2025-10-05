import { useTaskContext } from '../context/TaskContext'
import { TASK_FILTERS } from '../constant/TaskConstant'

const TaskFilter = () => {
  const { filter, setFilter, stats } = useTaskContext()

  const filterButtons = [
    { key: TASK_FILTERS.ALL, label: 'All Tasks', count: stats.total, icon: '📋' },
    { key: TASK_FILTERS.ACTIVE, label: 'Active', count: stats.pending, icon: '⏳' },
    { key: TASK_FILTERS.COMPLETED, label: 'Completed', count: stats.completed, icon: '✅' }
  ]

  return (
    <div className="neon-card filter-card">
      <div className="filter-header">
        <h3 className="filter-title">Filter Tasks</h3>
        <div className="stats-summary">
          <span className="stat-item">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </span>
        </div>
      </div>
      
      <div className="filter-buttons">
        {filterButtons.map(({ key, label, count, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
          >
            <span className="btn-icon">{icon}</span>
            <div className="btn-content">
              <span className="btn-label">{label}</span>
              <span className="btn-count">{count}</span>
            </div>
            <span className="btn-glow"></span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TaskFilter