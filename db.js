const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'default_db',
    'admin',
    'pnt9}<4rRYPKR^',
    {
        host: '147.45.138.212',
        port: '3306',
        dialect: 'mysql',
    }
)