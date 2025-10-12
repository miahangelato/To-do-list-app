import { Router } from 'express';
import { register, login, logout, getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// User CRUD routes
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;