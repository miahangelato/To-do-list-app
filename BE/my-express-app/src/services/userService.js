// User service interface
export class UserService {
  async getUsers() {
    throw new Error('Method not implemented');
  }

  async getUserById(id) {
    throw new Error('Method not implemented');
  }

  async getUserByEmail(email) {
    throw new Error('Method not implemented');
  }

  async registerUser(userData) {
    throw new Error('Method not implemented');
  }

  async loginUser(email, password) {
    throw new Error('Method not implemented');
  }

  async updateUser(id, userData) {
    throw new Error('Method not implemented');
  }

  async deleteUser(id) {
    throw new Error('Method not implemented');
  }
}

export default UserService;