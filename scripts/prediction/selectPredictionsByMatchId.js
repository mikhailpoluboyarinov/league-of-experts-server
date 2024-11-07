const sequelize = require('../../db');
const PredictionDB = require('../../utils/prediction');
const UserDB = require('../../utils/user');
const MatchDB = require('../../utils/match');
const CountryDB = require('../../utils/country');

const MATCH_ID = 41

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const usersData = await UserDB.getAllUsers();
        const matchesData = await MatchDB.getAllMatches();
        const predictionsData = await PredictionDB.getAllPredictionsByMatchId(MATCH_ID);
        const countriesData = await CountryDB.getAllCountries();

        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = item.nameRus;

            return acc;
        }, {});

        const users = usersData.reduce((acc, item) => {
            acc[item.id] = `${item.firstName} ${item.lastName}`;

            return acc;
        }, {});

        const matches = matchesData.reduce((acc, item) => {
            acc[item.id] = {
                host: countries[item.hostId],
                guest: countries[item.guestId],
                gameDay: item.gameDay,
            };

            return acc;
        }, {});

        const usersWithPredictions = []

        console.log('match', `${matches[MATCH_ID].host} - ${matches[MATCH_ID].guest}`)

        console.log('predictions', predictionsData.map(item => {
            usersWithPredictions.push(item.userId)
            return {
                user: users[item.userId],
                score: item.hostScore + ' ' + item.guestScore,
                isPari: item.isPari ? 'ПАРИ' : '-'
            };
        }));

        const usersWithoutPredictions = usersData.filter(user => !usersWithPredictions.includes(user.id));

        console.log('usersWithoutPredictions', usersWithoutPredictions.map(item => {
            return { user: users[item.id] };
        }));
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();