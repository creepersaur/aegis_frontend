const User = require('../models/User');
const MedicalProfile = require('../models/MedicalProfile');
const EmergencyContact = require('../models/EmergencyContact');

module.exports = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const userWithProfile = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: MedicalProfile,
                    required: false // LEFT JOIN in case medical profile is missing
                },
                {
                    model: EmergencyContact,
                    required: false
                }
            ],
            attributes: { exclude: ['password'] } // Do not send password
        });

        if (!userWithProfile) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(userWithProfile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
