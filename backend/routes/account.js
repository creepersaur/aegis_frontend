const express = require('express');
const router = express.Router();

router.get('/', require('../middlewares/auth'), require('../controllers/account'));

module.exports = router;