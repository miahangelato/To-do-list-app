import { useState, useEffect } from 'react'
import TaskAPI from '../api/TaskListAPI'
import { TASK_STATUS, TASK_FILTERS } from '../constant/TaskConstant'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState(TASK_STATUS.IDLE)
  const [filter, setFilter] = useState(TASK_FILTERS.ALL)
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 })

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    setStatus(TASK_STATUS.LOADING)

    try {
      const tasksData = await TaskAPI.getAllTasks()
      setTasks(tasksData)
      setStatus(TASK_STATUS.SUCCESS)
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch tasks'
      setError(errorMessage)
      setStatus(TASK_STATUS.ERROR)
    } finally {
      setLoading(false)
    }
  }

  // Fetch task statistics
  const fetchStats = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
      
      // Get user email from localStorage
      const user = localStorage.getItem('user')
      const userEmail = user ? JSON.parse(user).email : null
      
      const headers = userEmail ? { 'x-user-email': userEmail } : {}
      
      const response = await fetch(`${baseUrl}/tasks/stats`, {
        headers
      })
      const statsData = await response.json()
      setStats(statsData)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  // Create new task
  const createTask = async (taskData) => {
    setLoading(true)
    setError(null)

    try {
      const newTask = await TaskAPI.createTask(taskData)
      setTasks(prev => [newTask, ...prev])
      await fetchStats() // Update stats
      return { success: true, task: newTask }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Update task
  const updateTask = async (id, taskData) => {
    setLoading(true)
    setError(null)

    try {
      const updatedTask = await TaskAPI.updateTask(id, taskData)
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ))
      await fetchStats() // Update stats
      return { success: true, task: updatedTask }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    setLoading(true)
    setError(null)

    try {
      const updatedTask = await TaskAPI.toggleTask(id, completed)
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ))
      await fetchStats() // Update stats
      return { success: true, task: updatedTask }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to toggle task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    setLoading(true)
    setError(null)

    try {
      await TaskAPI.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
      await fetchStats() // Update stats
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case TASK_FILTERS.ACTIVE:
        return !task.completed
      case TASK_FILTERS.COMPLETED:
        return task.completed
      default:
        return true
    }
  })

  // Clear error
  const clearError = () => {
    setError(null)
    setStatus(TASK_STATUS.IDLE)
  }

  // Initialize tasks on mount
  useEffect(() => {
    fetchTasks()
    fetchStats()
  }, [])

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    status,
    filter,
    stats,
    
    setTasks,
    setLoading,
    setError,
    setStatus,
    setFilter,
    
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    clearError
  }
}