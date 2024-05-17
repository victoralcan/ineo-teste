const ProtestRepository = require('../repositories/protest.repository');
const UserService = require('../services/user.service');
const NotFoundError = require('../errors/notFound.error');
const generateRandomString = require('../utils/generateRandomStringStrategy');

class ProtestService {
  constructor(prisma, userService = new UserService(prisma), protestRepository = new ProtestRepository(prisma)) {
    this.protestRepository = protestRepository;
    this.userService = userService;
  }

  async addProtest(protestData) {
    const { payeeDocumentNumber, payeeName, payeeEmail, debtAmount, description, debtorDocumentNumber } = protestData;

    let payee = await this.userService.getUserByDocumentNumber(payeeDocumentNumber);
    console.log("payee primeira query", payee);

    if (!payee) {
      try {
        payee = await this.userService.addUser({
          documentNumber: payeeDocumentNumber,
          name: payeeName,
          email: payeeEmail,
          password: generateRandomString(12)
        });
        console.log("payee segunda query", payee);
      } catch (error) {
        throw new Error("Error creating protest: " + error.message);
      }
    }

    console.log("payee antes ultima query", payee);

    return await this.protestRepository.createProtest({
      userId: payee.id,
      debtAmount,
      description,
      debtorDocumentNumber
    });
  }

  async getProtestById(id, user) {
    const protest = await this.protestRepository.findProtestById(id);
    if (!protest || (user.role !== 'ADMIN' && user.role !== 'EMPLOYEE' && protest.userId !== user.id)) {
      throw new NotFoundError("Protest not found");
    }

    return protest;
  }

  async getProtestsByUserId(userId) {
    return await this.protestRepository.findProtestsByUserId(userId);
  }

  async updateProtest(id, protestData) {
    return await this.protestRepository.updateProtest(id, protestData);
  }

  async deleteProtest(id) {
    return await this.protestRepository.deleteProtest(id);
  }
}

module.exports = ProtestService;