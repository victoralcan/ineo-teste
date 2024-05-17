class ProtestRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createProtest(data) {
    return await this.prisma.protest.create({
      data,
    });
  }

  async findProtestById(id) {
    return await this.prisma.protest.findUnique({
      where: { id },
      include: {
        emolument: true,
      },
    });
  }

  async findProtestsByUserId(userId) {
    return await this.prisma.protest.findMany({
      where: { userId },
    });
  }

  async updateProtest(id, data) {
    return await this.prisma.protest.update({
      where: { id },
      data,
    });
  }

  async deleteProtest(id) {
    return await this.prisma.protest.delete({
      where: { id },
    });
  }
}

module.exports = ProtestRepository;
