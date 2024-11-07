const sequelize = require('../../db');
const PredictionDB = require('../../utils/prediction');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await PredictionDB.deleteAllPredictions();

        console.log('Все прогнозы удалены');
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();