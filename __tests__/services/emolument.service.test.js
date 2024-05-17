const EmolumentService = require('../../services/emolument.service');
const EmolumentRepository = require('../../repositories/emolument.repository');
const ProtestService = require('../../services/protest.service');

jest.mock('../../repositories/emolument.repository');
jest.mock('../../services/protest.service');

describe('EmolumentService', () => {
  let emolumentService;
  let mockEmolumentRepository;
  let mockProtestService;

  beforeEach(() => {
    mockEmolumentRepository = new EmolumentRepository();
    mockProtestService = new ProtestService();
    emolumentService = new EmolumentService({}, mockEmolumentRepository, mockProtestService);
    jest.clearAllMocks();
  });

  it('should add a new emolument', async () => {
    const protest = { id: 1, debtAmount: 1000 };
    const emolumentData = {
      protestId: protest.id
    };

    mockProtestService.getProtestById.mockResolvedValue(protest);
    mockEmolumentRepository.createEmolument.mockResolvedValue({ id: 1, ...emolumentData, amount: 50 });

    await emolumentService.addEmolument(protest.id);

    expect(mockProtestService.getProtestById).toHaveBeenCalledWith(protest.id);
    expect(mockEmolumentRepository.createEmolument).toHaveBeenCalledWith({ ...emolumentData, amount: 50 });
  });

  it('should get an emolument by id', async () => {
    const emolument = { id: 1 };
    const user = { id: 1, role: 'ADMIN' };

    mockEmolumentRepository.findEmolumentById.mockResolvedValue(emolument);

    await emolumentService.getEmolumentById(emolument.id, user);

    expect(mockEmolumentRepository.findEmolumentById).toHaveBeenCalledWith(emolument.id);
  });

  it('should get emoluments by user id', async () => {
    const userId = 1;

    await emolumentService.getEmolumentsByUserId(userId);

    expect(mockEmolumentRepository.findEmolumentsByUserId).toHaveBeenCalledWith(userId);
  });

  it('should update an emolument', async () => {
    const emolumentData = { id: 1, amount: 200 };

    mockEmolumentRepository.updateEmolument.mockResolvedValue(emolumentData);

    await emolumentService.updateEmolument(emolumentData.id, emolumentData);

    expect(mockEmolumentRepository.updateEmolument).toHaveBeenCalledWith(emolumentData.id, emolumentData);
  });

  it('should delete an emolument', async () => {
    const emolumentId = 1;

    mockEmolumentRepository.deleteEmolument.mockResolvedValue(true);

    await emolumentService.deleteEmolument(emolumentId);

    expect(mockEmolumentRepository.deleteEmolument).toHaveBeenCalledWith(emolumentId);
  });
});