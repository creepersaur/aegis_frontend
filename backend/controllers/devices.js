const Session = require('../models/Session');

exports.getDevices = async (req, res) => {
    try {
        const sessions = await Session.findAll({
            where: { user_id: req.user.id },
            order: [['last_active', 'DESC']]
        });
        
        // Flag the current session by matching the session id
        const currentSessionId = req.user.sessionId;
        const devices = sessions.map(session => {
            const data = session.toJSON();
            data.isCurrent = data.id === currentSessionId;
            return data;
        });

        return res.status(200).json(devices);
    } catch (err) {
        console.error('Error fetching devices:', err);
        return res.status(500).json({ message: 'Failed to fetch devices.' });
    }
};

exports.revokeDevice = async (req, res) => {
    try {
        const { id } = req.params;
        
        const session = await Session.findOne({
            where: { id: id, user_id: req.user.id }
        });

        if (!session) {
            return res.status(404).json({ message: 'Session not found.' });
        }

        await session.destroy();

        return res.status(200).json({ message: 'Device session revoked.' });
    } catch (err) {
        console.error('Error revoking device:', err);
        return res.status(500).json({ message: 'Failed to revoke device.' });
    }
};
