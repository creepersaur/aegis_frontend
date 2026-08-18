const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 12;

module.exports = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName) {
            return res.status(400).json({ 'message': 'Please enter a valid name.' });
        }

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email || !regex.test(email)) {
            return res.status(400).json({ 'message': 'Please enter a valid email.' });
        }
        if (await User.findOne({ where: {email: email} })) {
            return res.status(400).json({ 'message': 'Email address has already been taken.' });
        }

        if (!password) {
            return res.status(400).json({ 'message': 'Please enter a valid password.' });
        }
        if (password.length < 8) {
            return res.status(400).json({ 'message': 'Password should at least be of 8 characters.' });
        }

        const passwordHashed = await bcrypt.hash(password, saltRounds);

        await User.create({
            'fullName': fullName,
            'email': email,
            'password': passwordHashed
        });

        return res.status(200).json({ 'message': 'You have successfully registered.' });
    } catch (err) {
        console.error('Error during registration', err);
        return res.status(500).json({ 'message': 'An unexpected error occurred.' });
    }
};