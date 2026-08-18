const express = require('express');
const router = express.Router();

router.post('/', require('../controllers/register'));

module.exports = router;