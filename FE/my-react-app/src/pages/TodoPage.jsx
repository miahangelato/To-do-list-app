import { useUserContext } from '../context/UserContext'
import { TaskProvider } from '../context/TaskContext'
import TaskForm from '../components/TaskForm'
import TaskFilter from '../components/TaskFilter'
import TaskList from '../components/TaskList'
import '../styles/TodoPage.css'

const TodoPage = () => {
  const { user, handleLogout } = useUserContext()

  return (
    <TaskProvider>
      <div className="todo-container">
        {/* Background Effects */}
        <div className="background-effects">
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
          <div className="glow-orb glow-orb-3"></div>
        </div>

        {/* Header */}
        <header className="todo-header">
          <div className="header-content">
            <div className="header-info">
              <div className="logo-section">
                <span className="logo-icon">📋</span>
                <div>
                  <h1 className="header-title">My Todo List</h1>
                  <p className="header-subtitle">Welcome back, {user?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="logout-btn neon-btn"
            >
              <span>Logout</span>
              <span className="btn-glow"></span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="todo-main">
          <div className="todo-grid">
            {/* Task Form */}
            <div className="form-section">
              <TaskForm />
            </div>
            
            {/* Task Management */}
            <div className="tasks-section">
              {/* Task Filter */}
              <TaskFilter />
              
              {/* Task List */}
              <TaskList />
            </div>
          </div>
        </main>
      </div>
    </TaskProvider>
  )
}

export default TodoPage