const express = require('express');
const ProtestService = require('../services/protest.service');
const router = express.Router();

const prisma = require('@prisma/client');
const protestService = new ProtestService(new prisma.PrismaClient());

router.post('/', async (req, res) => {
  try {
    const protest = await protestService.addProtest(req.body);
    res.status(201).json(protest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const protest = await protestService.getProtestById(req.params.id);
    res.status(200).json(protest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const protest = await protestService.updateProtest(req.params.id, req.body);
    res.status(200).json(protest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await protestService.deleteProtest(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;