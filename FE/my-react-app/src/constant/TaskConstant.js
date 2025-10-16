// Task API endpoints
export const BASE_URL = import.meta.env.VITE_API_BASE_URL 
export const TASK_ENDPOINTS = {
  GET_ALL_TASKS: `${BASE_URL}/tasks`,
  GET_TASK_STATS: `${BASE_URL}/tasks/stats`,
  CREATE_TASK: `${BASE_URL}/tasks`,
  UPDATE_TASK: (id) => `${BASE_URL}/tasks/${id}`,
  DELETE_TASK: (id) => `${BASE_URL}/tasks/${id}`,
  GET_TASK: (id) => `${BASE_URL}/tasks/${id}`
}

// Export individual endpoints for compatibility with existing TaskAPI
export const GET_ALL_TASKS = TASK_ENDPOINTS.GET_ALL_TASKS
export const GET_TASK = TASK_ENDPOINTS.GET_TASK
export const CREATE_TASK = TASK_ENDPOINTS.CREATE_TASK
export const UPDATE_TASK = TASK_ENDPOINTS.UPDATE_TASK
export const DELETE_TASK = TASK_ENDPOINTS.DELETE_TASK

// Task status constants
export const TASK_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

// Task filter constants
export const TASK_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
}