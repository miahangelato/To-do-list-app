import { createContext, useContext } from 'react'
import { useTasks } from '../hooks/useTask'

const TaskContext = createContext(undefined)

export const TaskProvider = ({ children }) => {
  const taskState = useTasks()

  return (
    <TaskContext.Provider value={taskState}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error(
      'useTaskContext must be used within a TaskProvider'
    )
  }
  return context
}
