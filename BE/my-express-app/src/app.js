import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-user-email']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    res.json({ 
      status: 'OK', 
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0'
    });
  } catch (error) {
    res.status(503).json({
      status: 'ERROR',
      message: 'Service unavailable',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Simple health check for Docker (no database dependency)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Todo List API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      tasks: '/api/tasks',
      health: '/api/health'
    },
    documentation: 'Welcome to the Todo List API'
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    error: error.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
});

export default app;