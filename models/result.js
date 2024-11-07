const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const Match = require('./match');

const Result = sequelize.define('result', {
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
});

Result.belongsTo(Match, {
    foreignKey: 'matchId',
    targetKey: 'id',
});

module.exports = Result;
