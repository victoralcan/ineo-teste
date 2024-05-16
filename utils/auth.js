const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email
  };

  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1d' };

  return jwt.sign(payload, secret, options);
}

async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = { generateToken, verifyPassword };
