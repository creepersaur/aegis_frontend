const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');
require("dotenv").config();

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ 'message': 'You are not logged in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findByPk(decoded.id);
        if (!user) {
            res.clearCookie('token');
            return res.status(403).json({ 'message': 'User no longer exists. Please register again.' });
        }

        if (!decoded.sessionId) {
            res.clearCookie('token');
            return res.status(403).json({ 'message': 'Session expired. Please log in again.' });
        }

        const session = await Session.findOne({ where: { id: decoded.sessionId, user_id: user.id } });
        if (!session) {
            res.clearCookie('token');
            return res.status(403).json({ 'message': 'Session expired or revoked.' });
        }

        // Update last_active
        session.last_active = new Date();
        await session.save();

        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        console.log("Error in authentication middleware", err);
        return res.status(403).json({ 'message': 'Verification failed' });
    }
};