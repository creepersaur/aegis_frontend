const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

module.exports = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            try {
                const decoded = jwt.decode(token);
                if (decoded && decoded.sessionId) {
                    await Session.destroy({ where: { id: decoded.sessionId } });
                }
            } catch (e) {
                console.error('Error destroying session during logout:', e);
            }
        }
        res.clearCookie('token');
        return res.status(200).json({ 'message': 'Successfully logged out.' });
    } catch (err) {
        console.error('Error in logout', err);
        return res.status(500).json({ 'message': 'An unexpected error occurred.' });
    }
};