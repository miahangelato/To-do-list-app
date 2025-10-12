import axios from 'axios'
import { USER_ENDPOINTS } from '../constant/userConstant'

export const loginUser = async (credentials) => {
  try {
    console.log('Attempting login with:', { email: credentials.email, password: '***' });
    console.log('Logina URL:', USER_ENDPOINTS.LOGIN);
    
    const response = await axios.post(USER_ENDPOINTS.LOGIN, credentials);
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
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