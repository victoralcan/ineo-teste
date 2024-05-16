const ProtestRepository = require('../repositories/protest.repository');

class ProtestService {
  constructor(prisma) {
    this.protestRepository = new ProtestRepository(prisma);
  }

  async addProtest(protestData) {
    return await this.protestRepository.createProtest(protestData);
  }

  async getProtestById(id) {
    return await this.protestRepository.findProtestById(id);
  }

  async updateProtest(id, protestData) {
    return await this.protestRepository.updateProtest(id, protestData);
  }

  async deleteProtest(id) {
    return await this.protestRepository.deleteProtest(id);
  }
}

module.exports = ProtestService;