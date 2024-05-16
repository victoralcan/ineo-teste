const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const userRoutes = require('./user.route');
const protestRoutes = require('./protest.route');
const emolumentRoutes = require('./emolument.route');
const loginRoutes = require('./login.route');

router.use('/login', loginRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/protests', authMiddleware, protestRoutes);
router.use('/emoluments', authMiddleware, emolumentRoutes);

module.exports = router;