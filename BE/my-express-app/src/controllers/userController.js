import { UserServiceImpl } from '../services/impl/userServiceImpl.js';

const userService = new UserServiceImpl();

// Helper function to exclude password from user object
const excludePassword = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Register new user
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    if (password.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 3 characters long'
      });
    }

    // Create user using service
    const user = await userService.registerUser({ email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: excludePassword(user)
    });
  } catch (error) {
    if (error.message === 'User already exists with this email') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Login user using service
    const user = await userService.loginUser(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      user
    });
  } catch (error) {
    if (error.message === 'User not found' || error.message === 'Invalid password') {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Logout user (simple implementation)
export const logout = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    const usersWithoutPasswords = users.map(excludePassword);
    
    res.json({
      success: true,
      users: usersWithoutPasswords
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(parseInt(id));

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: excludePassword(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const user = await userService.updateUser(parseInt(id), updateData);

    res.json({
      success: true,
      message: 'User updated successfully',
      user: excludePassword(user)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(parseInt(id));

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};