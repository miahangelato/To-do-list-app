import { useState } from 'react'
import { useUserContext } from '../context/UserContext'
import { TaskProvider } from '../context/TaskContext'
import TaskForm from '../components/Todo/TaskForm'
import TaskFilter from '../components/Todo/TaskFilter'
import TaskList from '../components/Todo/TaskList'
import TaskListView from '../components/Todo/TaskListView'
import '../styles/TodoPage.css'

const TodoPage = () => {
  const { user, handleLogout } = useUserContext()
  const [viewMode, setViewMode] = useState('calendar') // 'calendar' or 'list'

  return (
    <TaskProvider>
      <div className="todo-container">
        {/* Header */}
        <header className="todo-header">
          <div className="header-content">
            <div className="header-left">
              <div className="logo-section">
                <span className="logo-icon">📋</span>
                <div className="header-text">
                  <h1 className="header-title">My Todo List</h1>
                  <p className="header-subtitle">Welcome back, {user?.email}</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Background Effects */}
        <div className="background-effects">
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
          <div className="glow-orb glow-orb-3"></div>
        </div>

        {/* Main Content */}
        <main className="todo-main">
          <div className="todo-content">
            {/* Left Column: Filter + Form */}
            <aside className="sidebar-column">
              <TaskFilter />
              <TaskForm />
            </aside>
            
            {/* Right Column: View Toggle + Calendar */}
            <section className="main-column">
              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                  onClick={() => setViewMode('calendar')}
                >
                  📅 Calendar View
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  📋 List View
                </button>
              </div>

              {viewMode === 'calendar' ? <TaskList /> : <TaskListView />}
            </section>
          </div>
        </main>
      </div>
    </TaskProvider>
  )
}

export default TodoPage
