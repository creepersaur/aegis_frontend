const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const MedicalProfile = sequelize.define('MedicalProfile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    allergies: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    previous_medical_history: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    chronic_illnesses: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    severe_medical_conditions: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    primary_doctor_contact: {
        type: DataTypes.JSON,
        allowNull: true
    }
}, {
    tableName: 'medical_profiles'
});

User.hasOne(MedicalProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
MedicalProfile.belongsTo(User, { foreignKey: 'user_id' });

module.exports = MedicalProfile;
