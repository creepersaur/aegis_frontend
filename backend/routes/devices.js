const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const devicesController = require('../controllers/devices');

router.get('/', auth, devicesController.getDevices);
router.delete('/:id', auth, devicesController.revokeDevice);

module.exports = router;
