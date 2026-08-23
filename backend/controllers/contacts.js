const EmergencyContact = require('../models/EmergencyContact');

exports.getContacts = async (req, res) => {
    try {
        const contacts = await EmergencyContact.findAll({
            where: { user_id: req.user.id }
        });
        return res.status(200).json(contacts);
    } catch (err) {
        console.error('Error fetching contacts:', err);
        return res.status(500).json({ message: 'Failed to fetch contacts.' });
    }
};

exports.addContact = async (req, res) => {
    try {
        const { name, phone, relation } = req.body;
        
        if (!name || !phone || !relation) {
            return res.status(400).json({ message: 'Name, phone, and relation are required.' });
        }

        const newContact = await EmergencyContact.create({
            user_id: req.user.id,
            name,
            phone: String(phone),
            relation
        });

        return res.status(201).json(newContact);
    } catch (err) {
        console.error('Error adding contact:', err);
        return res.status(500).json({ message: 'Failed to add contact.' });
    }
};
