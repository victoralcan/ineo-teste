const express = require('express');
const ProtestService = require('../services/protest.service');
const router = express.Router();
const authorize = require('../middlewares/authorize.middleware');

const prisma = require('@prisma/client');
const protestService = new ProtestService(new prisma.PrismaClient());

router.post('/', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protest = await protestService.addProtest(req.body);
    res.status(201).json(protest);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authorize("ADMIN", "USER", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protest = await protestService.getProtestById(req.params.id, req.user);
    res.status(200).json(protest);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    const protest = await protestService.updateProtest(req.params.id, req.body);
    res.status(200).json(protest);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authorize("ADMIN", "EMPLOYEE"), async (req, res, next) => {
  try {
    await protestService.deleteProtest(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;