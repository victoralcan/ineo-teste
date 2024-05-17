const PrismaClientMock = {
  emolument: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const EmolumentRepository = require('../../repositories/emolument.repository');

describe('EmolumentRepository', () => {
  let emolumentRepository;

  beforeEach(() => {
    emolumentRepository = new EmolumentRepository(PrismaClientMock);
    jest.clearAllMocks();
  });

  it('should create a new emolument', async () => {
    const emolumentData = { protestId: 1, amount: 100 };
    PrismaClientMock.emolument.create.mockResolvedValue(emolumentData);

    const result = await emolumentRepository.createEmolument(emolumentData);

    expect(PrismaClientMock.emolument.create).toHaveBeenCalledWith({ data: emolumentData });
    expect(result).toEqual(emolumentData);
  });

  it('should find an emolument by id', async () => {
    const emolument = { id: 1 };
    PrismaClientMock.emolument.findUnique.mockResolvedValue(emolument);

    const result = await emolumentRepository.findEmolumentById(emolument.id);

    expect(PrismaClientMock.emolument.findUnique).toHaveBeenCalledWith({ where: { id: emolument.id } });
    expect(result).toEqual(emolument);
  });

  it('should find emoluments by user id', async () => {
    const emoluments = [{ id: 1 }, { id: 2 }];
    const userId = 1;
    PrismaClientMock.emolument.findMany.mockResolvedValue(emoluments);

    const result = await emolumentRepository.findEmolumentsByUserId(userId);

    expect(PrismaClientMock.emolument.findMany).toHaveBeenCalledWith({ where: { protest: { userId } } });
    expect(result).toEqual(emoluments);
  });

  it('should update an emolument', async () => {
    const emolumentData = { id: 1, amount: 200 };
    PrismaClientMock.emolument.update.mockResolvedValue(emolumentData);

    const result = await emolumentRepository.updateEmolument(emolumentData.id, emolumentData);

    expect(PrismaClientMock.emolument.update).toHaveBeenCalledWith({ where: { id: emolumentData.id }, data: emolumentData });
    expect(result).toEqual(emolumentData);
  });

  it('should delete an emolument', async () => {
    const emolumentId = 1;
    PrismaClientMock.emolument.delete.mockResolvedValue(true);

    const result = await emolumentRepository.deleteEmolument(emolumentId);

    expect(PrismaClientMock.emolument.delete).toHaveBeenCalledWith({ where: { id: emolumentId } });
    expect(result).toBe(true);
  });
});