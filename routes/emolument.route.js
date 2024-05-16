const express = require('express');
const EmolumentService = require('../services/emolument.service');
const router = express.Router();

const prisma = require('@prisma/client');
const emolumentService = new EmolumentService(new prisma.PrismaClient());

router.post('/', async (req, res, next) => {
  try {
    const emolument = await emolumentService.addEmolument(req.body);
    res.status(201).json(emolument);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const emolument = await emolumentService.getEmolumentById(req.params.id);
    res.status(200).json(emolument);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const emolument = await emolumentService.updateEmolument(req.params.id, req.body);
    res.status(200).json(emolument);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await emolumentService.deleteEmolument(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;