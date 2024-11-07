const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const Country = require("./country");

const Misc = sequelize.define('misc', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    currentGameDay: {
        type: DataTypes.INTEGER,
    },
    isRegistrationOpen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

Misc.belongsTo(Country, {
    foreignKey: 'winnerCountry',
    targetKey: 'id',
});

module.exports = Misc;
