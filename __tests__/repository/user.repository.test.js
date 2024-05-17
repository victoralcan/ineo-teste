const PrismaClientMock = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const UserRepository = require('../../repositories/user.repository');

describe('UserRepository', () => {
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository(PrismaClientMock);
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const userData = { email: 'user@example.com', password: 'password' };
    PrismaClientMock.user.create.mockResolvedValue(userData);

    const result = await userRepository.createUser(userData);

    expect(PrismaClientMock.user.create).toHaveBeenCalledWith({ data: userData });
    expect(result).toEqual(userData);
  });

  it('should find a user by id', async () => {
    const user = { id: 1 };
    PrismaClientMock.user.findUnique.mockResolvedValue(user);

    const result = await userRepository.findUserById(user.id);

    expect(PrismaClientMock.user.findUnique).toHaveBeenCalledWith({ where: { id: user.id } });
    expect(result).toEqual(user);
  });

  it('should find a user by email', async () => {
    const user = { email: 'user@example.com' };
    PrismaClientMock.user.findUnique.mockResolvedValue(user);

    const result = await userRepository.findUserByEmail(user.email);

    expect(PrismaClientMock.user.findUnique).toHaveBeenCalledWith({ where: { email: user.email } });
    expect(result).toEqual(user);
  });

  it('should find a user by document number', async () => {
    const user = { documentNumber: '12345678901' };
    PrismaClientMock.user.findUnique.mockResolvedValue(user);

    const result = await userRepository.findUserByDocumentNumber(user.documentNumber);

    expect(PrismaClientMock.user.findUnique).toHaveBeenCalledWith({ where: { documentNumber: user.documentNumber } });
    expect(result).toEqual(user);
  });

  it('should update a user', async () => {
    const userData = { id: 1, email: 'updated@example.com' };
    PrismaClientMock.user.update.mockResolvedValue(userData);

    const result = await userRepository.updateUser(userData.id, userData);

    expect(PrismaClientMock.user.update).toHaveBeenCalledWith({ where: { id: userData.id }, data: userData });
    expect(result).toEqual(userData);
  });

  it('should delete a user', async () => {
    const userId = 1;
    PrismaClientMock.user.delete.mockResolvedValue(true);

    const result = await userRepository.deleteUser(userId);

    expect(PrismaClientMock.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
    expect(result).toBe(true);
  });
});