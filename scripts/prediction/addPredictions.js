const sequelize = require('../../db');
const PredictionDB = require('../../utils/prediction');

const predictions = [
    {
        userId: 1,
        matchId: 36,
        type: 'group',
        hostScore: 1,
        guestScore: 2,
        isAIPrediction: 1,
        isPari: 0,
    }
];

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        predictions.map((item) => {
            PredictionDB.addPrediction({
                userId: item.userId,
                matchId: item.matchId,
                type: item.type,
                hostScore: item.hostScore,
                guestScore: item.guestScore,
                extra: item.extra,
                isPari: item.isPari,
                isAIPrediction: item.isAIPrediction
            })
        });
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();