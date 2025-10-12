import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepositoryImpl {
  async findAll() {
    return prisma.user.findMany({
      include: {
        tasks: true
      }
    });
  }

  async findById(id) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        tasks: true
      }
    });
  }

  async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        tasks: true
      }
    });
  }

  async create(data) {
    return prisma.user.create({
      data,
      include: {
        tasks: true
      }
    });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        tasks: true
      }
    });
  }

  async delete(id) {
    return prisma.user.delete({
      where: { id }
    });
  }
}

export default UserRepositoryImpl;