const ProtestRepository = require('../repositories/protest.repository');
const UserService = require('../services/user.service');
const NotFoundError = require('../errors/notFound.error');

class ProtestService {
  constructor(prisma) {
    this.protestRepository = new ProtestRepository(prisma);
    this.userService = new UserService(prisma);
  }

  async addProtest(protestData) {
    const { payeeDocumentNumber, payeeName, payeeEmail, debtAmount, description } = protestData;

    let payee = await this.userService.getUserByDocumentNumber(payeeDocumentNumber);

    if (!payee) {
      try {
        payee = await this.userService.addUser({
          documentNumber: payeeDocumentNumber,
          name: payeeName,
          email: payeeEmail
        });
      } catch (error) {
        throw new Error("Error creating protest: " + error.message);
      }
    }

    return await this.protestRepository.createProtest({ userId: payee.id, debtAmount, description });
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