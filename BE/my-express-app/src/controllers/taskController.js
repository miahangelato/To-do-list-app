import { TaskServiceImpl } from '../services/impl/taskServiceImpl.js';
import { UserServiceImpl } from '../services/impl/userServiceImpl.js';

const taskService = new TaskServiceImpl();
const userService = new UserServiceImpl();

// Helper function to get user from email header
const getUserFromHeader = async (req) => {
  const userEmail = req.headers['x-user-email'];
  
  if (!userEmail) {
    throw new Error('User email required');
  }
  
  const user = await userService.getUserByEmail(userEmail);
  if (!user) {
    throw new Error('User not found');
  }
  
  return user;
};

class TaskController {
  // Retrieve all tasks ordered by creation date (filtered by user)
  async getAllTasks(req, res) {
    try {
      const user = await getUserFromHeader(req);
      const tasks = await taskService.getTasksByUserId(user.id);
      
      // Sort by creation date (newest first)
      const sortedTasks = tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      res.json(sortedTasks);
    } catch (error) {
      if (error.message === 'User email required') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  // Retrieve a specific task by ID (user-specific)
  async getTaskById(req, res) {
    try {
      const { id } = req.params;
      const user = await getUserFromHeader(req);
      
      const task = await taskService.getTaskById(parseInt(id));
      
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      // Check if task belongs to the user
      if (task.userId !== user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      res.json(task);
    } catch (error) {
      if (error.message === 'User email required') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  // Create a new task (user-specific)
  async createTask(req, res) {
    try {
      const { title, description, dueDate } = req.body;
      const user = await getUserFromHeader(req);
      
      // Validation
      if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required' });
      }
      
      if (!dueDate) {
        return res.status(400).json({ error: 'Due date is required for calendar tasks' });
      }
      
      const taskData = {
        title: title.trim(),
        description: description ? description.trim() : null,
        completed: false,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId: user.id
      };
      
      const task = await taskService.createTask(taskData);
      
      res.status(201).json(task);
    } catch (error) {
      if (error.message === 'User email required') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  // Update an existing task (user-specific)
  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, completed, dueDate } = req.body;
      const user = await getUserFromHeader(req);
      
      // Check if task exists and belongs to user
      const existingTask = await taskService.getTaskById(parseInt(id));
      
      if (!existingTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      if (existingTask.userId !== user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      // Validation
      if (title !== undefined && (!title || title.trim() === '')) {
        return res.status(400).json({ error: 'Title cannot be empty' });
      }
      
      const updateData = {};
      if (title !== undefined) updateData.title = title.trim();
      if (description !== undefined) updateData.description = description ? description.trim() : null;
      if (completed !== undefined) updateData.completed = Boolean(completed);
      if (dueDate !== undefined) updateData.dueDate = dueDate ? new Date(dueDate) : null;
      
      const task = await taskService.updateTask(parseInt(id), updateData);
      
      res.json(task);
    } catch (error) {
      if (error.message === 'User email required') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  // Delete a task (user-specific)
  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const user = await getUserFromHeader(req);
      
      // Check if task exists and belongs to user
      const existingTask = await taskService.getTaskById(parseInt(id));
      
      if (!existingTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      if (existingTask.userId !== user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      await taskService.deleteTask(parseInt(id));
      
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      if (error.message === 'User email required') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

  // Toggle task completion status (user-specific)
  async toggleTask(req, res) {
    try {
      const { id } = req.params;
      const user = await getUserFromHeader(req);
      
      // Check if task exists and belongs to user
      const existingTask = await taskService.getTaskById(parseInt(id));
      
      if (!existingTask) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      if (existingTask.userId !== user.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
      
      const task = await taskService.toggleTaskCompletion(parseInt(id));
      
      res.json(task);
    } catch (error) {
      if (error.message === 'User email required') {
        return res.status(401).json({ error: error.message });
      }
      if (error.message === 'User not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Task not found') {
        return res.status(404).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Failed to toggle task' });
    }
  }
}

export default TaskController;