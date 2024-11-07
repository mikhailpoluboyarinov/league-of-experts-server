const sequelize = require('../../db');
const ResultDB = require('../../utils/result');
const {DataTypes} = require("sequelize");
const ResultsDB = require("../../utils/result");

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const results = await ResultsDB.getAllResults();

        console.log('results', results);
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();