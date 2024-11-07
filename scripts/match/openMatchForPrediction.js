const sequelize = require('../../db');
const MatchDB = require('../../utils/match');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await MatchDB.openMatchForPrediction(2);
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();