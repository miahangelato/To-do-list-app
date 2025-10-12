import { Router } from 'express';
import TaskController from '../controllers/taskController.js';

const router = Router();
const taskController = new TaskController();

// Task CRUD routes
router.get('/', taskController.getAllTasks.bind(taskController));
router.get('/:id', taskController.getTaskById.bind(taskController));
router.post('/', taskController.createTask.bind(taskController));
router.put('/:id', taskController.updateTask.bind(taskController));
router.delete('/:id', taskController.deleteTask.bind(taskController));

// Task specific operations
router.patch('/:id/toggle', taskController.toggleTask.bind(taskController));

export default router;