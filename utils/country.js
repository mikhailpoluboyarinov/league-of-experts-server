const CountryModel = require('../models/country');

const addCountry = async ({ name, nameRus, code, group }) => {
    try {
        await CountryModel.create({ name, nameRus, code, group });

        console.log('Страна успешно добавлена');
    } catch (e) {
        throw new Error('Не смогли добавить страну в базу данных');
    }
}

const getAllCountries = async () => {
    try {
        return await CountryModel.findAll();
    } catch (e) {
        throw new Error('Ошибка получения всех стран из базы');
    }
}

const getCountryByID = async (id) => {
    try {
        return await CountryModel.findOne({ where: { id }});
    } catch (e) {
        throw new Error('Ошибка получения стран из базы по ID');
    }
}

const updateCountryCodeByID = async (id, { code }) => {
    try {
        return await CountryModel.update({ code }, { where: { id }});
    } catch (e) {
        throw new Error('Ошибка обновления кода стран по ID');
    }
}

module.exports = {
    addCountry,
    getAllCountries,
    getCountryByID,
    updateCountryCodeByID,
};