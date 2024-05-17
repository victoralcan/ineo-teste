const UserRepository = require('../repositories/user.repository');
const encryptPassword = require('../utils/encryptPasswordStrategy');

class UserService {
  constructor(prisma) {
    this.userRepository = new UserRepository(prisma);
  }

  async addUser(userData) {
    userData.password = await encryptPassword(userData.password);
    return await this.userRepository.createUser(userData);
  }

  async getUserById(id) {
    return await this.userRepository.findUserById(id);
  }

  async getUserByEmail(email) {
    return await this.userRepository.findUserByEmail(email);
  }

  async getUserByDocumentNumber(documentNumber) {
    return await this.userRepository.findUserByDocumentNumber(documentNumber);
  }

  async updateUser(id, userData) {
    userData.password = await encryptPassword(userData.password);
    return await this.userRepository.updateUser(id, userData);
  }

  async deleteUser(id) {
    return await this.userRepository.deleteUser(id);
  }
}

module.exports = UserService;