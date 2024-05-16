const EmolumentRepository = require('../repositories/emolument.repository');

class EmolumentService {
  constructor(prisma) {
    this.emolumentRepository = new EmolumentRepository(prisma);
  }

  async addEmolument(emolumentData) {
    return await this.emolumentRepository.createEmolument(emolumentData);
  }

  async getEmolumentById(id) {
    return await this.emolumentRepository.findEmolumentById(id);
  }

  async updateEmolument(id, emolumentData) {
    return await this.emolumentRepository.updateEmolument(id, emolumentData);
  }

  async deleteEmolument(id) {
    return await this.emolumentRepository.deleteEmolument(id);
  }
}

module.exports = EmolumentService;