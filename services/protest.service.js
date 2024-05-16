const ProtestRepository = require('../repositories/protest.repository');
const NotFoundError = require('../errors/notFound.error');

class ProtestService {
  constructor(prisma) {
    this.protestRepository = new ProtestRepository(prisma);
  }

  async addProtest(protestData) {
    return await this.protestRepository.createProtest(protestData);
  }

  async getProtestById(id, user) {
    const protest = await this.protestRepository.findProtestById(id);
    if (!protest || (user.role !== 'ADMIN' && user.role !== 'EMPLOYEE' && protest.userId !== user.id)) {
      throw new NotFoundError("Protest not found");
    }

    return protest;
  }

  async updateProtest(id, protestData) {
    return await this.protestRepository.updateProtest(id, protestData);
  }

  async deleteProtest(id) {
    return await this.protestRepository.deleteProtest(id);
  }
}

module.exports = ProtestService;