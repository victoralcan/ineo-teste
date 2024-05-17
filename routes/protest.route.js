const express = require('express');
const ProtestService = require('../services/protest.service');
const router = express.Router();
const authorize = require('../middlewares/authorize.middleware');

const prisma = require('@prisma/client');
const UnauthorizedError = require('../errors/unauthorized.error');
const protestService = new ProtestService(new prisma.PrismaClient());

/**
 * @swagger
 * /protests:
 *   post:
 *     security:
 *       - Authorization: []
 *     summary: Cria um novo protesto
 *     tags: [Protest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProtestCreationRequest'
 *     responses:
 *       201:
 *         description: Protesto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Protest'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protest = await protestService.addProtest(req.body);
    res.status(201).json(protest);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /protests/user:
 *   get:
 *     summary: Retorna todos os protestos do usuário logado
 *     tags: [Protest]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Protestos do usuário logado encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Protest'
 *       404:
 *         description: Nenhum protesto encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/user', authorize("ADMIN", "USER", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protests = await protestService.getProtestsByUserId(req.user.id);
    res.status(200).json(protests);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /protests/{id}:
 *   get:
 *     security:
 *       - Authorization: []
 *     summary: Retorna um protesto pelo ID
 *     tags: [Protest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do protesto
 *     responses:
 *       200:
 *         description: Protesto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Protest'
 *       404:
 *         description: Protesto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', authorize("ADMIN", "USER", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protest = await protestService.getProtestById(req.params.id, req.user);
    res.status(200).json(protest);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /protests/user/{userId}:
 *   get:
 *     summary: Retorna todos os protestos de um usuário pelo ID
 *     tags: [Protest]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do usuário
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Protestos do usuário encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Protest'
 *       404:
 *         description: Nenhum protesto encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/user/:userId', authorize("ADMIN", "USER", "EMPLOYEE"), async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN' && req.user.role !== 'EMPLOYEE' && req.user.id !== req.params.userId) {
      throw new UnauthorizedError("You are not authorized to access this resource");
    }
    const protests = await protestService.getProtestsByUserId(parseInt(req.params.userId));
    res.status(200).json(protests);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /protests/{id}:
 *   put:
 *     security:
 *       - Authorization: []
 *     summary: Atualiza um protesto pelo ID
 *     tags: [Protest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do protesto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Protest'
 *     responses:
 *       200:
 *         description: Protesto atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Protest'
 *       404:
 *         description: Protesto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protest = await protestService.updateProtest(req.params.id, req.body);
    res.status(200).json(protest);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /protests/{id}:
 *   delete:
 *     security:
 *       - Authorization: []
 *     summary: Deleta um protesto pelo ID
 *     tags: [Protest]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do protesto
 *     responses:
 *       204:
 *         description: Protesto deletado com sucesso
 *       404:
 *         description: Protesto não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    await protestService.deleteProtest(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;