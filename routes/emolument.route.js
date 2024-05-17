const express = require('express');
const EmolumentService = require('../services/emolument.service');
const router = express.Router();

const prisma = require('@prisma/client');
const authorize = require('../middlewares/authorize.middleware');
const emolumentService = new EmolumentService(new prisma.PrismaClient());

/**
 * @swagger
 * /emoluments:
 *   post:
 *     summary: Cria um novo emolumento
 *     tags: [Emolument]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmolumentCreationRequest'
 *     responses:
 *       201:
 *         description: Emolumento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emolument'
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post('/', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    const emolument = await emolumentService.addEmolument(req.body.protestId);
    res.status(201).json(emolument);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /emoluments/{id}:
 *   get:
 *     summary: Retorna um emolumento pelo ID
 *     tags: [Emolument]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do emolumento
 *     responses:
 *       200:
 *         description: Emolumento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emolument'
 *       404:
 *         description: Emolumento não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get('/:id', authorize("ADMIN", "USER", "EMPLOYEE"), async (req, res, next) => {
  try {
    const emolument = await emolumentService.getEmolumentById(req.params.id, req.user);
    res.status(200).json(emolument);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /emoluments/{id}:
 *   put:
 *     summary: Atualiza um emolumento pelo ID
 *     tags: [Emolument]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do emolumento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Emolument'
 *     responses:
 *       200:
 *         description: Emolumento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emolument'
 *       404:
 *         description: Emolumento não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put('/:id', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    const emolument = await emolumentService.updateEmolument(req.params.id, req.body);
    res.status(200).json(emolument);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /emoluments/{id}:
 *   delete:
 *     summary: Deleta um emolumento pelo ID
 *     tags: [Emolument]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do emolumento
 *     responses:
 *       204:
 *         description: Emolumento deletado com sucesso
 *       404:
 *         description: Emolumento não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete('/:id', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    await emolumentService.deleteEmolument(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;