// Task service interface
export class TaskService {
  async getTasks() {
    throw new Error('Method not implemented');
  }

  async getTaskById(id) {
    throw new Error('Method not implemented');
  }

  async getTasksByUserId(userId) {
    throw new Error('Method not implemented');
  }

  async createTask(taskData) {
    throw new Error('Method not implemented');
  }

  async updateTask(id, taskData) {
    throw new Error('Method not implemented');
  }

  async deleteTask(id) {
    throw new Error('Method not implemented');
  }

  async toggleTaskCompletion(id) {
    throw new Error('Method not implemented');
  }
}

export default TaskService;