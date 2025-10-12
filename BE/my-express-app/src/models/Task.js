// Task model interface
export const Task = {
  id: Number,
  title: String,
  description: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date,
  userId: Number,
  user: Object // User
};

export default Task;