const bcrypt = require('bcryptjs');

async function encryptPassword(password) {
  return await bcrypt.hash(password, 10);
}

module.exports = encryptPassword;