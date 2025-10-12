import axios from 'axios';
import { 
  GET_ALL_TASKS, 
  GET_TASK, 
  CREATE_TASK, 
  UPDATE_TASK, 
  DELETE_TASK 
} from '../constant/taskConstant';

// Helper function to get user email from localStorage
const getUserEmail = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user).email : null;
};

// Helper function to get headers with user email
const getHeaders = () => {
  const userEmail = getUserEmail();
  return userEmail ? { 'x-user-email': userEmail } : {};
};

export const getAllTasks = async () => {
  try {
    console.log('Fetching tasks from:', GET_ALL_TASKS);
    console.log('Headers:', getHeaders());
    
    const response = await axios.get(GET_ALL_TASKS, {
      headers: getHeaders()
    });
    
    console.log('Tasks response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get tasks error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    throw error;
  }
};

export const getTask = async (id) => {
  const response = await axios.get(GET_TASK(id), {
    headers: getHeaders()
  });
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await axios.post(CREATE_TASK, taskData, {
    headers: getHeaders()
  });
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await axios.put(UPDATE_TASK(id), taskData, {
    headers: getHeaders()
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(DELETE_TASK(id), {
    headers: getHeaders()
  });
  return response.data;
};