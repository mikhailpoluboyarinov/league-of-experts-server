const PredictionModel = require('../models/prediction');

const isPredictionExists = async (userId, matchId) => {
    try {
        const prediction = await PredictionModel.findOne({ where: { userId, matchId } });

        return Boolean(prediction);
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка проверки существования прогноза на матч');
    }
}

const isPariExists = async (userId, matchId) => {
    try {
        const predictionWithPari = await PredictionModel.findOne({ where: { userId, matchId, isPari: true } });

        return Boolean(predictionWithPari);
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка проверки существования пари на матч');
    }
}

const getUserPredictions = async ({ userId }) => {
    try {
        return await PredictionModel.findAll({ where: { userId } })
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка получения прогнозов юзера на матчи');
    }
}

const getUserPredictionsWithPari = async ({ userId }) => {
    try {
        return await PredictionModel.findAll({ where: { userId, isPari: true } })
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка получения прогнозов юзера на матчи');
    }
}

const getAllPredictionsByMatchId = async (matchId) => {
    try {
        return await PredictionModel.findAll({ where: { matchId } })
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка получения прогнозов пользователей на конкретный матч');
    }
}

const getUserPredictionByMatchId = async (userId, matchId) => {
    try {
        return await PredictionModel.findOne({ where: { userId, matchId } })
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка получения прогнозов юзера на конкретный матч');
    }
}

const addPrediction = async ({ userId, matchId, type, hostScore, guestScore, extra, isPari, isAIPrediction }) => {
    try {
        await PredictionModel.create({
            userId,
            matchId,
            type,
            hostScore,
            guestScore,
            extra,
            isPari,
            isAIPrediction
        });

        console.log('Прогноз успешно добавлен');
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли добавить прогноз в базу данных');
    }
}

const updatePrediction = async ({ userId, matchId, hostScore, guestScore}) => {
    try {
        await PredictionModel.update({ hostScore, guestScore}, { where: { userId, matchId }});

        console.log('Прогноз успешно обновлён');
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли обновить прогноз в базе данных');
    }
}

const setPredictionPari = async ({ userId, matchId, isPari}) => {
    try {
        await PredictionModel.update({ isPari }, { where: { userId, matchId }});

        console.log('Пари успешно добавлено');
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли установить пари в базе данных');
    }
}

const getAllPredictions = async () => {
    try {
        return await PredictionModel.findAll();
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка поиска всех прогнозов в базе');
    }
}

const deleteAllPredictions = async () => {
    try {
        return await PredictionModel.destroy({
            where: {},
            truncate: true
        });
    } catch (e) {
        throw new Error('Ошибка удаления всех прогнозов в базе');
    }
}

module.exports = {
    addPrediction,
    updatePrediction,
    getAllPredictions,
    getUserPredictions,
    getUserPredictionsWithPari,
    getUserPredictionByMatchId,
    getAllPredictionsByMatchId,
    isPredictionExists,
    isPariExists,
    deleteAllPredictions,
    setPredictionPari,
};