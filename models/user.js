const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const Country = require("./country");

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    chatId: {
        type: DataTypes.STRING,
        unique: true,
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    winnerCount: {
        type: DataTypes.INTEGER
    },
    lastWinner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    regStatus: {
        type: DataTypes.STRING,
        defaultValue: 'not_started',
    },
    isAI: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    hotBallPoints: {
        type: DataTypes.INTEGER,
    },
    winnerPoints: {
        type: DataTypes.INTEGER,
    }
});

User.belongsTo(Country, {
    foreignKey: 'winnerPrediction',
    targetKey: 'id',
});

module.exports = User;
