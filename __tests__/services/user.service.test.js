const UserService = require('../../services/user.service');
const UserRepository = require('../../repositories/user.repository');
const encryptPassword = require('../../utils/encryptPasswordStrategy');

jest.mock('../../repositories/user.repository');
jest.mock('../../utils/encryptPasswordStrategy');

describe('UserService', () => {
  let userService;
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = new UserRepository();
    userService = new UserService({}, mockUserRepository);
    jest.clearAllMocks();
  });

  it('should add a new user', async () => {
    let userData = {
      documentNumber: '12345678901',
      name: 'User',
      email: 'user@example.com',
      password: 'password'
    };

    const hashPassword = "hashedPassword";

    encryptPassword.mockResolvedValue(hashPassword);
    mockUserRepository.createUser.mockResolvedValue({ id: 1, ...userData, password: hashPassword });

    await userService.addUser(userData);

    expect(encryptPassword).toHaveBeenCalledWith('password');
    expect(mockUserRepository.createUser).toHaveBeenCalledWith({ ...userData });
  });

  it('should get a user by id', async () => {
    const user = { id: 1 };

    mockUserRepository.findUserById.mockResolvedValue(user);

    await userService.getUserById(user.id);

    expect(mockUserRepository.findUserById).toHaveBeenCalledWith(user.id);
  });

  it('should get a user by email', async () => {
    const user = { email: 'user@example.com' };

    mockUserRepository.findUserByEmail.mockResolvedValue(user);

    await userService.getUserByEmail(user.email);

    expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(user.email);
  });

  it('should get a user by document number', async () => {
    const user = { documentNumber: '12345678901' };

    mockUserRepository.findUserByDocumentNumber.mockResolvedValue(user);

    await userService.getUserByDocumentNumber(user.documentNumber);

    expect(mockUserRepository.findUserByDocumentNumber).toHaveBeenCalledWith(user.documentNumber);
  });

  it('should update a user', async () => {
    const userData = { id: 1, name: 'Updated User' };

    mockUserRepository.updateUser.mockResolvedValue(userData);

    await userService.updateUser(userData.id, userData);

    expect(mockUserRepository.updateUser).toHaveBeenCalledWith(userData.id, userData);
  });

  it('should delete a user', async () => {
    const userId = 1;

    mockUserRepository.deleteUser.mockResolvedValue(true);

    await userService.deleteUser(userId);

    expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
  });
});