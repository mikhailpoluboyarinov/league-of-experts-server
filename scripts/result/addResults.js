const sequelize = require('../../db');
const ResultDB = require('../../utils/result');
const {DataTypes} = require("sequelize");

const results = [
    {
        matchId: 36,
        type: 'group',
        hostScore: 2,
        guestScore: 0,
    }
];

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        results.map((item) => {
            ResultDB.addResult({
                matchId: item.matchId,
                type: item.type,
                hostScore: item.hostScore,
                guestScore: item.guestScore,
                extra: item.extra,
            })
        });
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();