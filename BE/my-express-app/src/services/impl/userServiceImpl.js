import { UserRepositoryImpl } from '../../repositories/impl/userRepositoryImpl.js';

const userRepo = new UserRepositoryImpl();

export class UserServiceImpl {
  async getUsers() {
    return userRepo.findAll();
  }

  async getUserById(id) {
    return userRepo.findById(id);
  }

  async getUserByEmail(email) {
    return userRepo.findByEmail(email);
  }

  async registerUser(userData) {
    // Check if user already exists
    const existingUser = await userRepo.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    return userRepo.create(userData);
  }

  async loginUser(email, password) {
    // Find user by email
    const user = await userRepo.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Simple password check (in production, use proper hashing)
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(id, userData) {
    return userRepo.update(id, userData);
  }

  async deleteUser(id) {
    return userRepo.delete(id);
  }
}

export default UserServiceImpl;