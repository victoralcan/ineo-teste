const { generateToken, verifyPassword } = require('../utils/auth');
const express = require('express');
const router = express.Router();
const UserService = require('../services/user.service');
const prisma = require('@prisma/client');
const UnauthorizedError = require('../errors/unauthorized.error');

const userService = new UserService(new prisma.PrismaClient());

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Faz login do usuário e gera um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Login ou senha inválidos
 *       500:
 *         description: Erro no servidor
 */
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