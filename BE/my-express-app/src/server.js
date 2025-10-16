import app from './app.js';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Test database connection
async function connectToDatabase() {
  try {
    await prisma.$connect();
  } catch (error) {
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    await connectToDatabase();
    
    app.listen(PORT, () => {});
  } catch (error) {
    process.exit(1);
  }
}

startServer();