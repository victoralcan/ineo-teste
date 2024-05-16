class EmolumentRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createEmolument(data) {
    return await this.prisma.emolument.create({
      data,
    });
  }

  async findEmolumentById(id) {
    return await this.prisma.emolument.findUnique({
      where: { id },
    });
  }

  async updateEmolument(id, data) {
    return await this.prisma.emolument.update({
      where: { id },
      data,
    });
  }

  async deleteEmolument(id) {
    return await this.prisma.emolument.delete({
      where: { id },
    });
  }
}

module.exports = EmolumentRepository;