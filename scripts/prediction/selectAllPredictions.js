const sequelize = require('../../db');
const PredictionDB = require('../../utils/prediction');
const UserDB = require('../../utils/user');
const MatchDB = require('../../utils/match');
const CountryDB = require('../../utils/country');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const usersData = await UserDB.getAllUsers();
        const matchesData = await MatchDB.getAllMatches();
        const predictionsData = await PredictionDB.getAllPredictions();
        const countriesData = await CountryDB.getAllCountries();

        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = item.name;

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

        console.log('predictions', predictionsData.map(item => {
            return {
                user: users[item.userId],
                match: `${matches[item.matchId].host} - ${matches[item.matchId].guest}`,
                hostScore: item.hostScore,
                guestScore: item.guestScore,
            };
        }));
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();