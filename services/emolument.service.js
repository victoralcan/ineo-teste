const EmolumentRepository = require('../repositories/emolument.repository');
const ProtestService = require('./protest.service');
const calculateEmolument = require('../utils/calculateEmolumentStrategy');
const NotFoundError = require('../errors/notFound.error');

class EmolumentService {
  constructor(prisma, emolumentRepository = new EmolumentRepository(prisma), protestService = new ProtestService(prisma)) {
    this.emolumentRepository = emolumentRepository;
    this.protestService = protestService;
  }

  async addEmolument(protestId) {
    try {
      const protest = await this.protestService.getProtestById(protestId);
      if (!protest) {
        throw new NotFoundError("Protest not found");
      }

      const calculatedAmount = calculateEmolument(protest.debtAmount);

      const emolumentToCreate = {
        protestId: protest.id,
        amount: calculatedAmount
      };

      return await this.emolumentRepository.createEmolument(emolumentToCreate);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      } else {
        throw new Error("Unknown error creating emolument: " + error.message);
      }
    }
  }


  async getEmolumentById(id, user) {
    const emolument = await this.emolumentRepository.findEmolumentById(id);

    if (!emolument || (user.role !== 'ADMIN' && user.role !== 'EMPLOYEE' && emolument.userId !== user.id)) {
      throw new NotFoundError("Emolument not found");
    }

    return emolument;
  }

  async getEmolumentsByUserId(userId) {
    return await this.emolumentRepository.findEmolumentsByUserId(userId);
  }

  async updateEmolument(id, emolumentData) {
    return await this.emolumentRepository.updateEmolument(id, emolumentData);
  }

  async deleteEmolument(id) {
    return await this.emolumentRepository.deleteEmolument(id);
  }
}

module.exports = EmolumentService;