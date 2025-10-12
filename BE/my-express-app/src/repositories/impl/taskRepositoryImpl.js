import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskRepositoryImpl {
  async findAll() {
    return prisma.task.findMany({
      include: {
        user: true
      }
    });
  }

  async findById(id) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
  }

  async findByUserId(userId) {
    return prisma.task.findMany({
      where: { userId },
      include: {
        user: true
      }
    });
  }

  async create(data) {
    return prisma.task.create({
      data,
      include: {
        user: true
      }
    });
  }

  async update(id, data) {
    return prisma.task.update({
      where: { id },
      data,
      include: {
        user: true
      }
    });
  }

  async delete(id) {
    return prisma.task.delete({
      where: { id }
    });
  }
}

export default TaskRepositoryImpl;