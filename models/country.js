const { DataTypes } = require('sequelize');

const sequelize = require('../db');

const Country = sequelize.define('country', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    code: {
        type: DataTypes.STRING,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    nameRus: {
        type: DataTypes.STRING,
    },
    group: {
        type: DataTypes.STRING,
    }
});

module.exports = Country;
