const TelegramApi = require('node-telegram-bot-api');

const sequelize = require('./db');

const UserDB = require('./utils/user');
const MatchDB = require('./utils/match');
const CountryDB = require('./utils/country');
const PredictionDB = require('./utils/prediction');
const MiscDB = require('./utils/misc');

const chooseMatchTemplateForUser = require('./templates/chooseMatch');
const chooseWinnerCupTemplate = require('./templates/chooseWinnerCup');
const setMatchScoreTemplate = require('./templates/setMatchScore');
const makePredictionMatchTemplate = require('./templates/makePredictionMatch');
const makePredictionWinnerCupTemplate = require('./templates/makePredictionWinnerCup');
const suggestPariTemplate = require('./templates/suggestPari');

const token = '7144718818:AAGxlfif7LaeNIVXeHth-__VLJz0ZrasRE4';
const bot = new TelegramApi(token, { polling: true });

let matchIdInProcess = null;

const MAX_PARI_COUNT_FOR_USER_PLAY_OFF = 2

const chooseMatch = async (userId, chatId) => {
    try {
        const template = await chooseMatchTemplateForUser(userId);

        return bot.sendMessage(chatId, 'На какой матч будем делать прогноз?', template);
    } catch (e) {
        return bot.sendMessage(chatId, 'Ошибка при попытке сделать прогноз');
    }
}

const chooseWinnerCup = async (userId, chatId) => {
    try {
        const template = await chooseWinnerCupTemplate();

        return bot.sendMessage(chatId, 'Итак, кто выйграет ЧЕ2024?', template);
    } catch (e) {
        console.log(e);
        return bot.sendMessage(chatId, 'Ошибка при попытке сделать прогноз на победителя ЧЕ');
    }
}

const setMatchScore = async (userId, chatId, matchId) => {
    try {
        const template = await setMatchScoreTemplate(matchId);
        const userPrediction = await PredictionDB.getUserPredictionByMatchId(userId, matchId);

        if (userPrediction) {
            return bot.sendMessage(chatId, `Вы уже сделали прогноз на этот матч: ${userPrediction.hostScore}-${userPrediction.guestScore} . Обновим счёт?`, template);
        }

        return bot.sendMessage(chatId, 'Какой будет счёт?', template);
    } catch (e) {
        return bot.sendMessage(chatId, 'Ошибка при попытке запроса счёта');
    }
}

const setWinnerCup = async (userId, chatId, countryId) => {
    try {
        const template = await chooseMatchTemplateForUser();
        const country = await CountryDB.getCountryByID(countryId);

        const isRegistrationOpen = await MiscDB.isRegistrationOpen();

        if (!isRegistrationOpen) {
            return bot.sendMessage(chatId, 'К сожалению, все прогнозы на победителя ЧЕ2024 уже сделаны!');
        }

        await UserDB.updateUser({ regStatus: 'registered', winnerPrediction: countryId }, chatId);

        return bot.sendMessage(chatId, `Принято! Регистрация завершена! Вы сделали прогноз на победителя ЧЕ2024 (${country.nameRus}). Теперь можно сделать прогноз на первый матч`, template);
    } catch (e) {
        return bot.sendMessage(chatId, 'Ошибка при попытке прогноза на победителя ЧМ');
    }
}

const setMatchScoreMain = async (userId, chatId, payload) => {
    try {
        const parsedPayload = payload.split('_');
        const matchId = parsedPayload[0];
        const scoreString = parsedPayload[1];
        const parsedScore = scoreString.split('-');

        const match = await MatchDB.findMatchById(matchId);
        const isPredictionExists = await PredictionDB.isPredictionExists(userId, matchId);
        const countriesData = await CountryDB.getAllCountries();
        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = {
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
            };

            return acc;
        }, {});

        const userPredictionsWithPari = await PredictionDB.getUserPredictionsWithPari({ userId })
        const userPredictionsWithPariPlayOff = userPredictionsWithPari.filter(prediction => prediction.type === 'play_off')
        const userPariCountLeft = MAX_PARI_COUNT_FOR_USER_PLAY_OFF - userPredictionsWithPariPlayOff.length
        const isUserEligibleForPari = userPariCountLeft > 0

        const isMatchClosedForPari = match.isClosedForPari || match.isDoublePoints
        const isPariExists = await PredictionDB.isPariExists(userId, matchId);

        const isPariAllowed = isUserEligibleForPari && !isPariExists && !isMatchClosedForPari
        const pariTemplate = await suggestPariTemplate(matchId, userPariCountLeft);

        if (match.isClosedForPrediction) {
            return bot.sendMessage(chatId, 'Приём прогнозов на этот матч уже закрыт!');
        }

        if (isPredictionExists) {
            await PredictionDB.updatePrediction({
                userId,
                matchId,
                hostScore: parsedScore[0],
                guestScore: parsedScore[1],
            });

            return bot.sendMessage(chatId, 'Принято! Вы обновили свой прогноз: ' + countries[match.hostId].nameRus + ' ' + scoreString + ' ' + countries[match.guestId].nameRus, isPariAllowed ? pariTemplate : undefined);
        } else {
            await PredictionDB.addPrediction({
                userId,
                matchId,
                type: match.type,
                hostScore: parsedScore[0],
                guestScore: parsedScore[1],
            });

            return bot.sendMessage(chatId, 'Принято! Вы сделали прогноз: ' + countries[match.hostId].nameRus + ' ' + scoreString + ' ' + countries[match.guestId].nameRus, isPariAllowed ? pariTemplate : undefined);
        }
    } catch (e) {
        console.log(e);
        return bot.sendMessage(chatId, 'Ошибка при попытке установить счёт. Попробуйте ещё раз!');
    }
}

const chooseMatchScoreCustom = async (userId, chatId, matchId) => {
    try {
        const match = await MatchDB.findMatchById(matchId);
        const countriesData = await CountryDB.getAllCountries();
        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = {
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
            };

            return acc;
        }, {});

        // Глобальная переменная для понимания, что пользователь в сценарии ручной установки счёта на матч
        matchIdInProcess = matchId;

        return bot.sendMessage(chatId, `Напишите ваш прогноз на матч ${countries[match.hostId].nameRus} - ${countries[match.guestId].nameRus}. Например, 3-0`);
    } catch (e) {
        return bot.sendMessage(chatId, 'Ошибка при попытке установить счёт матча вручную. Попробуйте ещё раз!');
    }
}

const setMatchScoreCustom = async (chatId, userId, { matchId, score } ) => {
    try {
        if (!/^\d\-\d$/gi.test(score)) {
            return bot.sendMessage(chatId, 'Вы ввели счёт в неправильном формате! Пример правильного формата: 3-3. Попробуйте ещё раз!');
        }

        const parsedScore = score.split('-');

        const match = await MatchDB.findMatchById(matchId);
        const isPredictionExists = await PredictionDB.isPredictionExists(userId, matchId);
        const countriesData = await CountryDB.getAllCountries();
        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = {
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
            };

            return acc;
        }, {});

        const userPredictionsWithPari = await PredictionDB.getUserPredictionsWithPari({ userId })
        const userPredictionsWithPariPlayOff = userPredictionsWithPari.filter(prediction => prediction.type === 'play_off')
        const userPariCountLeft = MAX_PARI_COUNT_FOR_USER_PLAY_OFF - userPredictionsWithPariPlayOff.length
        const isUserEligibleForPari = userPariCountLeft > 0

        const isMatchClosedForPari = match.isClosedForPari || match.isDoublePoints
        const isPariExists = await PredictionDB.isPariExists(userId, matchId);

        const isPariAllowed = isUserEligibleForPari && !isPariExists && !isMatchClosedForPari
        const pariTemplate = await suggestPariTemplate(matchId, userPariCountLeft);

        if (match.isClosedForPrediction) {
            return bot.sendMessage(chatId, 'Приём прогнозов на этот матч уже закрыт!');
        }

        if (isPredictionExists) {
            await PredictionDB.updatePrediction({
                userId,
                matchId,
                hostScore: parsedScore[0],
                guestScore: parsedScore[1],
            });

            // сбрасываем переменную матча, чтобы закончить сценарий
            matchIdInProcess = null;

            return bot.sendMessage(chatId, 'Принято! Вы обновили свой прогноз: ' + countries[match.hostId].nameRus + ' ' + score + ' ' + countries[match.guestId].nameRus, isPariAllowed ? pariTemplate : undefined);
        } else {
            await PredictionDB.addPrediction({
                userId,
                matchId,
                type: match.type,
                hostScore: parsedScore[0],
                guestScore: parsedScore[1],
            });

            // сбрасываем переменную матча, чтобы закончить сценарий
            matchIdInProcess = null;

            return bot.sendMessage(chatId, 'Принято! Вы сделали прогноз: ' + countries[match.hostId].nameRus + ' ' + score + ' ' + countries[match.guestId].nameRus, isPariAllowed ? pariTemplate : undefined);
        }
    } catch (e) {
        console.log(e);
        return bot.sendMessage(chatId, 'Ошибка при попытке установить счёт');
    }
}

const setPariForMatch = async (userId, chatId, payload) => {
    try {
        const matchId = payload

        await PredictionDB.setPredictionPari({
            userId,
            matchId,
            isPari: true,
        });

        const userPredictions = await PredictionDB.getUserPredictions({ userId })
        const userPredictionsWithPari = userPredictions.filter(prediction => prediction.isPari)
        const userPredictionsWithPariPlayOff = userPredictionsWithPari.filter(prediction => prediction.type === 'play_off')
        const userPariCountLeft = MAX_PARI_COUNT_FOR_USER_PLAY_OFF - userPredictionsWithPariPlayOff.length

        return bot.sendMessage(chatId, `Принято! Вы заключили пари с Осьминогом Паулем на этот матч! У вас осталось ${userPariCountLeft} пари`);
    } catch (e) {
        console.log(e);
        return bot.sendMessage(chatId, 'Ошибка при попытке создать пари');
    }
}

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }

    bot.on('message', async (msg) => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const user = await UserDB.getUserByChatId(chatId);
        const isRegistrationOpen = await MiscDB.isRegistrationOpen();

        try {
            if (!user) {
                if (!isRegistrationOpen) {
                    return bot.sendMessage(chatId, 'К сожалению, регистрация в этом розыгрыше Лиги Экспертов уже закрыта');
                }

                await UserDB.createUser(chatId);

                return bot.sendMessage(chatId, 'Привет и добро пожаловать в Лигу Экспертов ЧE2024! Для участия необходимо зарегистрироваться. Напишите, вак вас зовут');
            }

            if (user.regStatus === 'not_started') {
                await UserDB.updateUser({ firstName: text, regStatus: 'has_first_name' }, chatId);

                return bot.sendMessage(chatId, 'А фамилия?');
            }

            if (user.regStatus === 'has_first_name') {
                await UserDB.updateUser({ lastName: text, regStatus: 'has_last_name' }, chatId);

                return bot.sendMessage(chatId, `Регистрация почти завершена! Теперь давайте сделаем свой первый прогноз на победителя ЧЕ`, makePredictionWinnerCupTemplate);
            }

            if (user.regStatus === 'has_last_name') {
                return bot.sendMessage(chatId, `Чтобы завершить регистрацию, давайте сделаем свой первый прогноз на победителя ЧЕ`, makePredictionWinnerCupTemplate);
            }

            if (matchIdInProcess) {
                return setMatchScoreCustom(chatId, user.id, { matchId: matchIdInProcess, score: text});
            }

            return bot.sendMessage(chatId, `Привет, ${user.firstName}! Сделаем прогноз на матч?`, makePredictionMatchTemplate);
        } catch (e) {
            console.log(e);
            return bot.sendMessage(chatId, 'Ошибка одного из сценариев бота');
        }
    });

    bot.on('callback_query', async msg => {
        const action = JSON.parse(msg.data);
        const chatId = msg.message.chat.id;
        const user = await UserDB.getUserByChatId(chatId);

        try {
            switch (action.type) {
                case 'MAKE_PREDICTION_MATCH':
                    return chooseMatch(user.id, chatId);
                case 'MAKE_PREDICTION_WINNER_CUP':
                    return chooseWinnerCup(user.id, chatId);
                case 'CHOOSE_MATCH':
                    return setMatchScore(user.id, chatId, action.payload);
                case 'CHOOSE_WINNER_CUP':
                    return setWinnerCup(user.id, chatId, action.payload);
                case 'SET_MATCH_SCORE':
                    return setMatchScoreMain(user.id, chatId, action.payload);
                case 'CHOOSE_MATCH_SCORE_CUSTOM':
                    return chooseMatchScoreCustom(user.id, chatId, action.payload);
                case 'SUGGEST_PARI_FOR_MATCH':
                    return setPariForMatch(user.id, chatId, action.payload);
                default:
                    return bot.sendMessage(chatId, 'Что-то пошло не так');
            }
        } catch (e) {
            return bot.sendMessage(chatId, 'Ошибка коллбэка бота');
        }
    })
}

start();