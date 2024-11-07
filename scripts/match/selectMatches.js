const sequelize = require('../../db');
const MatchDB = require('../../utils/match');
const CountryDB = require('../../utils/country');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const matchesData = await MatchDB.getAllMatches();
        const countriesData = await CountryDB.getAllCountries();

        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = {
                name: item.name,
                code: item.code,
            };

            return acc;
        }, {});

        console.log('matches', matchesData.map(item => {
            return {
                id: item.id,
                host: countries[item.hostId].name,
                guest: countries[item.guestId].name,
                time: new Date(item.startTime * 1000),
                isClosedForPrediction: item.isClosedForPrediction,
            };
        }));
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();