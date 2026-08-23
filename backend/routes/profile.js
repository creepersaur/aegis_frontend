const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const profileController = require('../controllers/profile');

router.get('/', authMiddleware, profileController);

module.exports = router;
