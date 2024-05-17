const express = require('express');
const UserService = require('../services/user.service');
const router = express.Router();

const prisma = require('@prisma/client');
const userService = new UserService(new prisma.PrismaClient());

/**
 * @swagger
 * /users:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Cria um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreationRequest'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/', async (req, res, next) => {
  try {
    const user = await userService.addUser(req.body);
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Retorna um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *       - Authorization: []
 *     summary: Atualiza um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', async (req, res, next) => {
  try {
    const user = await userService.updateUser(parseInt(req.params.id), req.body);
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Deleta um usuário pelo ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await userService.deleteUser(parseInt(req.params.id));
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;