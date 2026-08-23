const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const EmergencyContact = sequelize.define('EmergencyContact', {
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    relation: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'emergency_contacts'
});

User.hasMany(EmergencyContact, { foreignKey: 'user_id', onDelete: 'CASCADE' });
EmergencyContact.belongsTo(User, { foreignKey: 'user_id' });

module.exports = EmergencyContact;
