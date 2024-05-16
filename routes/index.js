const express = require('express');
const router = express.Router();

const userRoutes = require('./user.route');
const protestRoutes = require('./protest.route');
const emolumentRoutes = require('./emoluments.route');

router.use('/users', userRoutes);
router.use('/protests', protestRoutes);
router.use('/emoluments', emolumentRoutes);

module.exports = router;