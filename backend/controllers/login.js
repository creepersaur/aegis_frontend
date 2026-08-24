const User = require('../models/User');
const Session = require('../models/Session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UAParser = require('ua-parser-js');
const crypto = require('crypto');
require("dotenv").config();

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ 'message': 'Please enter a valid email.' });
        }

        if (!password) {
            return res.status(400).json({ 'message': 'Please enter a valid password.' });
        }

        const user = await User.findOne({ where: {email: email} });
        if (!user) {
            return res.status(401).json({ 'message': 'Invalid credentials.' });
        }

        if (await bcrypt.compare(password, user.password)) {
            const sessionId = crypto.randomUUID();

            const payload = {
                'id': user.id,
                'fullName': user.fullName,
                'email': user.email,
                'createdAt': user.createdAt,
                'sessionId': sessionId
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { 'expiresIn': '7d' });
            
            const parser = new UAParser(req.headers['user-agent']);
            const result = parser.getResult();
            const deviceName = `${result.browser.name || 'Unknown Browser'} on ${result.os.name || 'Unknown OS'}`;

            let ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || req.ip || req.socket?.remoteAddress || 'Unknown IP';
            if (ipAddress === '::1' || ipAddress === '::ffff:127.0.0.1') ipAddress = '127.0.0.1 (Localhost)';

            await Session.create({
                id: sessionId,
                user_id: user.id,
                device_name: deviceName,
                ip_address: ipAddress
            });

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            return res.status(200).json({ 'message': 'Login successful.' });
        }
        return res.status(401).json({ 'message': 'Invalid credentials.' });
    } catch (err) {
        console.error('Error in login:', err);
        return res.status(500).json({ 'message': 'An unexpected error occurred.' });
    }
};