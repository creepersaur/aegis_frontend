module.exports = (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ 'message': 'Successfully logged out.' });
    } catch (err) {
        console.error('Error in logout', err);
        return res.status(500).json({ 'message': 'An unexpected error occurred.' });
    }
};