import { TaskRepositoryImpl } from '../../repositories/impl/taskRepositoryImpl.js';
import { UserRepositoryImpl } from '../../repositories/impl/userRepositoryImpl.js';

const taskRepo = new TaskRepositoryImpl();
const userRepo = new UserRepositoryImpl();

export class TaskServiceImpl {
  async getTasks() {
    return taskRepo.findAll();
  }

  async getTaskById(id) {
    return taskRepo.findById(id);
  }

  async getTasksByUserId(userId) {
    return taskRepo.findByUserId(userId);
  }

  async createTask(taskData) {
    // Validate user exists
    if (taskData.userId) {
      const user = await userRepo.findById(taskData.userId);
      if (!user) {
        throw new Error('User not found');
      }
    }

    return taskRepo.create(taskData);
  }

  async updateTask(id, taskData) {
    // Check if task exists
    const existingTask = await taskRepo.findById(id);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    return taskRepo.update(id, taskData);
  }

  async deleteTask(id) {
    // Check if task exists
    const existingTask = await taskRepo.findById(id);
    if (!existingTask) {
      throw new Error('Task not found');
    }

    return taskRepo.delete(id);
  }

  async toggleTaskCompletion(id) {
    const task = await taskRepo.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }

    return taskRepo.update(id, {
      completed: !task.completed
    });
  }
}

export default TaskServiceImpl;