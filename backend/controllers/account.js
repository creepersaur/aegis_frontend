const User = require("../models/User");
const MedicalProfile = require("../models/MedicalProfile");

module.exports = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            include: [
                { model: MedicalProfile, attributes: { exclude: ["id", "user_id", "createdAt", "updatedAt"] } }
            ],
            attributes: { exclude: ["password", "id", "createdAt", "updatedAt"] }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.log("Error in fetching user/medical profile:", err);
        return res.status(500).json({ "Error": "An unexpected error occurred." });
    }
};