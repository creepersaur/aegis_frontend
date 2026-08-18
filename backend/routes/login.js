const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/login'));

module.exports = router;