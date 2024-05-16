const { generateToken, verifyPassword } = require('../utils/auth');
const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const prisma = require('@prisma/client');
const UnauthorizedError = require('../errors/unauthorized.error');

const userService = new UserService(new prisma.PrismaClient());

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (user && await verifyPassword(password, user.password)) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      throw new UnauthorizedError('Login or password invalid');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;