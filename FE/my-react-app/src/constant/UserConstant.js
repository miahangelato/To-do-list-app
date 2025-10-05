// User API endpoints
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const USER_ENDPOINTS = {
  LOGIN: `${BASE_URL}/users/login`,
  REGISTER: `${BASE_URL}/users/register`,
  LOGOUT: `${BASE_URL}/users/logout`
}

// User status constants
export const USER_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
}

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'user'
}