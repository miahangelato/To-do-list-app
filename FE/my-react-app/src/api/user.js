import axios from 'axios'
import { USER_ENDPOINTS } from '../constant/UserConstant'

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(USER_ENDPOINTS.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const registerUser = async (userData) => {
  const response = await axios.post(USER_ENDPOINTS.REGISTER, userData)
  return response.data
}

export const logoutUser = async () => {
  const response = await axios.post(USER_ENDPOINTS.LOGOUT)
  return response.data
}