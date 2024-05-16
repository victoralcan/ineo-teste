const EmolumentRepository = require('../repositories/emolument.repository');
const ProtestService = require('./protest.service');
const calculateEmolument = require('../utils/calculateEmolumentStrategy');

class EmolumentService {
  constructor(prisma) {
    this.emolumentRepository = new EmolumentRepository(prisma);
    this.protestService = new ProtestService(prisma);
  }

  async addEmolument(protestId) {
    try {
      const protest = await this.protestService.getProtestById(protestId);
      if (!protest) {
        throw new Error("Protest not found");
      }

      const calculatedAmount = calculateEmolument(protest.debtAmount);

      const emolumentToCreate = {
        protestId: protest.id,
        amount: calculatedAmount
      };

      return await this.emolumentRepository.createEmolument(emolumentToCreate);
    } catch (error) {
      throw new Error("Error creating emolument: " + error.message);
    }
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