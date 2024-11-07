const { DataTypes } = require('sequelize');

const sequelize = require('../db');
const Country = require('./country');

const Match = sequelize.define('match', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    type: {
        type: DataTypes.STRING,
    },
    startTime: {
        type: DataTypes.INTEGER,
    },
    gameDay: {
        type: DataTypes.INTEGER,
    },
    isClosedForPrediction: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isDoublePoints: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    isClosedForPari: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    description: {
        type: DataTypes.STRING,
    }
});

Match.belongsTo(Country, {
    foreignKey: 'hostId',
    targetKey: 'id',
});

Match.belongsTo(Country, {
    foreignKey: 'guestId',
    targetKey: 'id',
});

module.exports = Match;
