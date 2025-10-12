// Task API endpoints
const BASE_URL = import.meta.env.VITE_API_BASE_URL 

export const GET_ALL_TASKS = `${BASE_URL}/tasks`
export const GET_TASK_STATS = `${BASE_URL}/tasks/stats`
export const CREATE_TASK = `${BASE_URL}/tasks`
export const UPDATE_TASK = (id) => `${BASE_URL}/tasks/${id}`
export const DELETE_TASK = (id) => `${BASE_URL}/tasks/${id}`
export const GET_TASK = (id) => `${BASE_URL}/tasks/${id}`

// Task filter constants
export const TASK_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
}