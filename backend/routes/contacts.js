const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const contactsController = require('../controllers/contacts');

router.get('/', auth, contactsController.getContacts);
router.post('/', auth, contactsController.addContact);

module.exports = router;
