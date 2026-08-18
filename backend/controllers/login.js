const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 12;

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).response('Please enter a valid email.');
        }

        if (!password) {
            return res.status(400).response('Please enter a valid password');S
        }

        const user = await User.findOne({ where: {email: email} });
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                'id': user.id,
                'fullName': user.fullName,
                'email': user.email,
                'createdAt': user.createdAt
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { 'expiresIn': '7d' });
            res.cookie('token', token); // secure this cookie
            return res.status(200).json({ 'message': 'Login successful.' });
        }
        return res.status(401).json({ 'message': 'Invalid credentials.' });
    } catch (err) {
        console.error('Error in login', err);
        return res.status(500).json({ 'message': 'An unexpected error occurred.' });
    }
};