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
      {/* Full-Width Header/Navbar */}
      <header className="todo-header-fullwidth">
        <div className="header-content-wide">
          <div className="header-info">
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
            className="logout-btn neon-btn"
          >
            <span>Logout</span>
            <span className="btn-glow"></span>
          </button>
        </div>
      </header>

      <div className="todo-container">
        {/* Background Effects */}
        <div className="background-effects">
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
          <div className="glow-orb glow-orb-3"></div>
        </div>

        {/* Main Content */}
        <main className="todo-main">
          <div className="todo-layout">
            {/* Left Sidebar - Filter & Add Task */}
            <aside className="sidebar-section">
              {/* Task Filter */}
              <TaskFilter />
              
              {/* Task Form */}
              <TaskForm />
            </aside>
            
            {/* Right Main Area - Calendar/List Toggle */}
            <section className="calendar-section">
              {/* View Toggle */}
              <div className="view-toggle-container">
                <button 
                  className={`view-toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                  onClick={() => setViewMode('calendar')}
                >
                  <span className="toggle-icon">📅</span>
                  <span className="toggle-text">Calendar View</span>
                </button>
                <button 
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <span className="toggle-icon">📋</span>
                  <span className="toggle-text">List View</span>
                </button>
              </div>

              {/* Conditional Rendering based on viewMode */}
              {viewMode === 'calendar' ? <TaskList /> : <TaskListView />}
            </section>
          </div>
        </main>
      </div>
    </TaskProvider>
  )
}

export default TodoPage
