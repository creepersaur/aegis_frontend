const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Session = sequelize.define('Session', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    device_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ip_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    last_active: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'sessions'
});

User.hasMany(Session, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Session.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Session;
