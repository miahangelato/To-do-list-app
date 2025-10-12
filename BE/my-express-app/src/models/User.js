// User model interface
export const User = {
  id: Number,
  email: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
  tasks: Array // Task[]
};

export default User;