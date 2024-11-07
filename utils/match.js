const MatchModel = require('../models/match');

const addMatch = async ({ hostId, guestId, startTime, gameDay, type }) => {
    try {
        await MatchModel.create({ hostId, guestId, startTime, gameDay, type });

        console.log('Матч успешно добавлен');
    } catch (e) {
        throw new Error('Не смогли добавить матч в базу данных');
    }
}

const findMatchById = async (matchId) => {
    try {
        return await MatchModel.findOne({ where: { id: matchId } });
    } catch (e) {
        throw new Error('Ошибка поиска матча в базе');
    }
}

const getAllMatches = async () => {
    try {
        return await MatchModel.findAll();
    } catch (e) {
        throw new Error('Ошибка поиска всех матчей в базе');
    }
}

const getMatchesByGameDayId = async (gameDayId) => {
    try {
        return await MatchModel.findAll({ where: { gameDay: gameDayId } });
    } catch (e) {
        throw new Error('Ошибка поиска всех матчей в базе');
    }
}

const openMatchForPrediction = async (id) => {
    try {
        await MatchModel.update({ isClosedForPrediction: false }, { where: { id } });

        console.log('Матч успешно открыт для прогнозов');
    } catch (e) {
        throw new Error('Ошибка открытия матча для прогноза');
    }
}

const closeMatchForPrediction = async (id) => {
    try {
        await MatchModel.update({ isClosedForPrediction: true }, { where: { id } });

        console.log('Матч успешно закрыт для прогнозов');
    } catch (e) {
        throw new Error('Ошибка закрытия матча для прогноза');
    }
}

const sync = async () => {
    MatchModel.sync({ alter: true, cascade: true });
}

module.exports = {
    addMatch,
    findMatchById,
    getAllMatches,
    getMatchesByGameDayId,
    sync,
    openMatchForPrediction,
    closeMatchForPrediction,
};