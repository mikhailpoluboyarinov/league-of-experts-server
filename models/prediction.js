const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const Match = require('./match');
const User = require('./user');

const Prediction = sequelize.define('prediction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
    },
    extra: {
        type: DataTypes.STRING,
    },
    hostScore: {
        type: DataTypes.INTEGER,
    },
    guestScore: {
        type: DataTypes.INTEGER,
    },
    hostScoreExtra: {
        type: DataTypes.INTEGER,
    },
    guestScoreExtra: {
        type: DataTypes.INTEGER,
    },
    hostScorePenalty: {
        type: DataTypes.INTEGER,
    },
    guestScorePenalty: {
        type: DataTypes.INTEGER,
    },
    isPari: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isAIPrediction: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

Prediction.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
});

Prediction.belongsTo(Match, {
    foreignKey: 'matchId',
    targetKey: 'id',
});

module.exports = Prediction;
