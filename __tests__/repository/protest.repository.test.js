const PrismaClientMock = {
  protest: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

const ProtestRepository = require('../../repositories/protest.repository');

describe('ProtestRepository', () => {
  let protestRepository;

  beforeEach(() => {
    protestRepository = new ProtestRepository(PrismaClientMock);
    jest.clearAllMocks();
  });

  it('should create a new protest', async () => {
    const protestData = { userId: 1, title: 'Protest Title' };
    PrismaClientMock.protest.create.mockResolvedValue(protestData);

    const result = await protestRepository.createProtest(protestData);

    expect(PrismaClientMock.protest.create).toHaveBeenCalledWith({ data: protestData });
    expect(result).toEqual(protestData);
  });

  it('should find a protest by id', async () => {
    const protest = { id: 1 };
    PrismaClientMock.protest.findUnique.mockResolvedValue(protest);

    const result = await protestRepository.findProtestById(protest.id);

    expect(PrismaClientMock.protest.findUnique).toHaveBeenCalledWith({ where: { id: protest.id }, include: { emolument: true } });
    expect(result).toEqual(protest);
  });

  it('should find protests by user id', async () => {
    const protests = [{ id: 1 }, { id: 2 }];
    const userId = 1;
    PrismaClientMock.protest.findMany.mockResolvedValue(protests);

    const result = await protestRepository.findProtestsByUserId(userId);

    expect(PrismaClientMock.protest.findMany).toHaveBeenCalledWith({ where: { userId } });
    expect(result).toEqual(protests);
  });

  it('should update a protest', async () => {
    const protestData = { id: 1, title: 'Updated Title' };
    PrismaClientMock.protest.update.mockResolvedValue(protestData);

    const result = await protestRepository.updateProtest(protestData.id, protestData);

    expect(PrismaClientMock.protest.update).toHaveBeenCalledWith({ where: { id: protestData.id }, data: protestData });
    expect(result).toEqual(protestData);
  });

  it('should delete a protest', async () => {
    const protestId = 1;
    PrismaClientMock.protest.delete.mockResolvedValue(true);

    const result = await protestRepository.deleteProtest(protestId);

    expect(PrismaClientMock.protest.delete).toHaveBeenCalledWith({ where: { id: protestId } });
    expect(result).toBe(true);
  });
});