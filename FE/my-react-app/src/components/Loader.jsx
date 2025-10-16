import '../styles/Loader.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <span className="loader-icon">📋</span>
        </div>
        <h2 className="loader-title">My Todo List</h2>
        <p className="loader-text">Loading your workspace...</p>
      </div>
      
      {/* Background Effects */}
      <div className="loader-background">
        <div className="loader-orb loader-orb-1"></div>
        <div className="loader-orb loader-orb-2"></div>
        <div className="loader-orb loader-orb-3"></div>
      </div>
    </div>
  )
}

export default Loader
