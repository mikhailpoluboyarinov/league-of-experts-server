const ResultModel = require('../models/result');

const addResult = async ({ matchId, type, hostScore, guestScore, extra }) => {
    try {
        await ResultModel.create({
            matchId,
            type,
            hostScore,
            guestScore,
            extra,
        });

        console.log('Результат успешно добавлен');
    } catch (e) {
        throw new Error('Не смогли добавить результат в базу данных');
    }
}

const getAllResults = async () => {
    try {
        return await ResultModel.findAll();
    } catch (e) {
        console.log(e);
        throw new Error('Ошибка поиска всех прогнозов в базе');
    }
}

module.exports = {
    addResult,
    getAllResults,
};