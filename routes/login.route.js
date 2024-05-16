const { generateToken, verifyPassword } = require('../utils/auth');
const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const prisma = require('@prisma/client');

const userService = new UserService(new prisma.PrismaClient());

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByEmail(email);
    if (user && await verifyPassword(password, user.password)) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Login or password invalid' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});