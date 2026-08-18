const express = require('express');
const router = express.Router();

router.get('/', require('../middlewares/auth'), require('../controllers/auth-status'));

module.exports = router;