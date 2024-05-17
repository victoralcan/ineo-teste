const jwt = require('jsonwebtoken');
const UserService = require('../services/user.service');
const prisma = require('@prisma/client');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = await new UserService(new prisma.PrismaClient()).getUserById(user.userId);
    next();
  });
}

module.exports = authenticateToken;