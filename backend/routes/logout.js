const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/logout'));

module.exports = router;