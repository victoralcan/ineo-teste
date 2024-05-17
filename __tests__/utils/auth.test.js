const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateToken, verifyPassword } = require('../../utils/auth');

jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Auth Utils', () => {
  it('should generate a token', () => {
    const user = { id: 1, email: 'user@example.com' };
    const token = 'token';
    jwt.sign.mockReturnValue(token);

    const result = generateToken(user);

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    expect(result).toEqual(token);
  });

  it('should verify a password', async () => {
    const password = 'password';
    const hashedPassword = 'hashedPassword';
    bcrypt.compare.mockResolvedValue(true);

    const result = await verifyPassword(password, hashedPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(result).toBe(true);
  });

  it('should fail to verify a password', async () => {
    const password = 'password';
    const hashedPassword = 'hashedPassword';
    bcrypt.compare.mockResolvedValue(false);

    const result = await verifyPassword(password, hashedPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(result).toBe(false);
  });
});