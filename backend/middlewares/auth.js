const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ 'message': 'You are not logged in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        
        const user = await User.findByPk(decoded.id);
        if (!user) {
            res.clearCookie('token');
            return res.status(403).json({ 'message': 'User no longer exists. Please register again.' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie('token');
        return res.status(403).json({ 'message': 'Verification failed' });
    }
};