const sequelize = require('../../db');
const CountryDB = require('../../utils/country');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const countries = await CountryDB.getAllCountries();

        console.log('countries', countries.map(item => {
            return {
                id: item.id,
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
            };
        }));
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();