const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ 'message': 'You are not logged in.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // add user verification
        next();
    } catch (err) {
        return res.status(403).json({ 'message': 'Verification failed' });
    }
};