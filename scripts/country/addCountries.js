const sequelize = require('../../db');
const CountryDB = require('../../utils/country');

const groupA = [
    {
        name: 'Germany',
        nameRus: 'Германия',
        code: 'DE',
        group: 'A'
    },
    {
        name: 'Scotland',
        nameRus: 'Шотландия',
        code: 'SCOTLAND',
        group: 'A'
    },
    {
        name: 'Hungary',
        nameRus: 'Венгрия',
        code: 'HU',
        group: 'A'
    },
    {
        name: 'Switzerland',
        nameRus: 'Швейцария',
        code: 'CH',
        group: 'A'
    },
];

const groupB = [
    {
        name: 'Spain',
        nameRus: 'Испания',
        code: 'ES',
        group: 'B'
    },
    {
        name: 'Croatia',
        nameRus: 'Хорватия',
        code: 'HR',
        group: 'B'
    },
    {
        name: 'Italy',
        nameRus: 'Италия',
        code: 'IT',
        group: 'B'
    },
    {
        name: 'Albania',
        nameRus: 'Албания',
        code: 'AL',
        group: 'B'
    },
];

const groupC = [
    {
        name: 'Slovenia',
        nameRus: 'Словения',
        code: 'SI',
        group: 'C'
    },
    {
        name: 'Denmark',
        nameRus: 'Дания',
        code: 'DK',
        group: 'C'
    },
    {
        name: 'Serbia',
        nameRus: 'Сербия',
        code: 'RS',
        group: 'C'
    },
    {
        name: 'England',
        nameRus: 'Англия',
        code: 'GB-ENG',
        group: 'C'
    },
];

const groupD = [
    {
        name: 'Poland',
        nameRus: 'Польша',
        code: 'PL',
        group: 'D'
    },
    {
        name: 'Netherlands',
        nameRus: 'Нидерланды',
        code: 'NL',
        group: 'D'
    },
    {
        name: 'Austria',
        nameRus: 'Австрия',
        code: 'AT',
        group: 'D'
    },
    {
        name: 'France',
        nameRus: 'Франция',
        code: 'FR',
        group: 'D'
    },
];

const groupE = [
    {
        name: 'Belgium',
        nameRus: 'Бельгия',
        code: 'BE',
        group: 'E'
    },
    {
        name: 'Slovakia',
        nameRus: 'Словакия',
        code: 'SK',
        group: 'E'
    },
    {
        name: 'Romania',
        nameRus: 'Румыния',
        code: 'RO',
        group: 'E'
    },
    {
        name: 'Ukraine',
        nameRus: 'Украина',
        code: 'UA',
        group: 'E'
    },
];

const groupF = [
    {
        name: 'Turkey',
        nameRus: 'Турция',
        code: 'TR',
        group: 'F'
    },
    {
        name: 'Georgia',
        nameRus: 'Грузия',
        code: 'GE',
        group: 'F'
    },
    {
        name: 'Portugal',
        nameRus: 'Португалия',
        code: 'PT',
        group: 'F'
    },
    {
        name: 'Czechia',
        nameRus: 'Чехия',
        code: 'CZ',
        group: 'F'
    },
];

const countries = groupF;

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        countries.map((item) => {
            CountryDB.addCountry({
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
                group: item.group,
            })
        });
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();