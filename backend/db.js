const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false,
});

sequelize.authenticate()
    .then(() => console.log('SQLite connected successfully'))
    .catch((err) => console.error('Error connecting to SQLite:', err));
sequelize.sync();

module.exports = sequelize;