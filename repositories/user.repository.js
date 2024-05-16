class UserRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async createUser(data) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findUserById(id) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUser(id, data) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

module.exports = UserRepository;
