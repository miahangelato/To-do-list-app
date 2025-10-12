import { useState, useEffect } from 'react'
import { getAllTasks, createTask, updateTask, deleteTask } from '../api/task'
import { TASK_FILTERS } from '../constant/TaskConstant'

export const useTasks = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState(TASK_FILTERS.ALL)

  // Compute stats from tasks
  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
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

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true)
    setError(null)

    try {
      const tasksData = await getAllTasks()
      setTasks(tasksData)
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch tasks'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Create a new task
  const handleCreateTask = async (taskData) => {
    setLoading(true)
    setError(null)

    try {
      const newTask = await createTask(taskData)
      setTasks(prev => [...prev, newTask])
      return { success: true, data: newTask }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Update a task
  const handleUpdateTask = async (id, taskData) => {
    setLoading(true)
    setError(null)

    try {
      const updatedTask = await updateTask(id, taskData)
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ))
      return { success: true, data: updatedTask }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to update task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Delete a task
  const handleDeleteTask = async (id) => {
    setLoading(true)
    setError(null)

    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
      return { success: true }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete task'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Toggle task completion
  const handleToggleTask = async (id, completed) => {
    return handleUpdateTask(id, { completed })
  }

  // Load tasks on mount
  useEffect(() => {
    fetchTasks()
  }, [])

  return {
    tasks,
    filteredTasks,
    loading,
    error,
    filter,
    stats,
    setFilter,
    fetchTasks,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    toggleTask: handleToggleTask
  }
}
