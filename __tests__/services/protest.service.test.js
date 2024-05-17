const ProtestService = require('../../services/protest.service');
const ProtestRepository = require('../../repositories/protest.repository');
const UserService = require('../../services/user.service');

jest.mock('../../repositories/protest.repository');
jest.mock('../../services/user.service');

describe('ProtestService', () => {
  let protestService;
  let mockProtestRepository;
  let mockUserService;

  beforeEach(() => {
    mockProtestRepository = new ProtestRepository();
    mockUserService = new UserService();
    protestService = new ProtestService({}, mockUserService, mockProtestRepository);
    jest.clearAllMocks();
  });

  it('should add a new protest', async () => {
    const protestData = {
      payeeDocumentNumber: '12345678901',
      payeeName: 'Employee User',
      payeeEmail: 'employee@example.com',
      debtAmount: 7654.32,
      debtorDocumentNumber: '10987654321'
    };

    mockUserService.getUserByDocumentNumber.mockResolvedValue(undefined);
    mockUserService.addUser.mockResolvedValue({ id: 1 });
    mockProtestRepository.createProtest.mockResolvedValue({ id: 1, ...protestData });

    await protestService.addProtest(protestData);

    expect(mockUserService.getUserByDocumentNumber).toHaveBeenCalledWith(protestData.payeeDocumentNumber);
    expect(mockUserService.addUser).toHaveBeenCalledWith({
      documentNumber: protestData.payeeDocumentNumber,
      name: protestData.payeeName,
      email: protestData.payeeEmail,
      password: expect.any(String)
    });
    expect(mockProtestRepository.createProtest).toHaveBeenCalledWith({
      userId: 1,
      debtAmount: protestData.debtAmount,
      description: protestData.description,
      debtorDocumentNumber: protestData.debtorDocumentNumber
    });
  });

  it('should get a protest by id', async () => {
    const protest = { id: 1 };
    const user = { id: 1, role: 'ADMIN' };

    mockProtestRepository.findProtestById.mockResolvedValue(protest);

    await protestService.getProtestById(protest.id, user);

    expect(mockProtestRepository.findProtestById).toHaveBeenCalledWith(protest.id);
  });

  it('should get protests by user id', async () => {
    const userId = 1;

    await protestService.getProtestsByUserId(userId);

    expect(mockProtestRepository.findProtestsByUserId).toHaveBeenCalledWith(userId);
  });

  it('should update a protest', async () => {
    const protestData = { id: 1, title: 'Updated Protest' };

    mockProtestRepository.updateProtest.mockResolvedValue(protestData);

    await protestService.updateProtest(protestData.id, protestData);

    expect(mockProtestRepository.updateProtest).toHaveBeenCalledWith(protestData.id, protestData);
  });

  it('should delete a protest', async () => {
    const protestId = 1;

    mockProtestRepository.deleteProtest.mockResolvedValue(true);

    await protestService.deleteProtest(protestId);

    expect(mockProtestRepository.deleteProtest).toHaveBeenCalledWith(protestId);
  });
});