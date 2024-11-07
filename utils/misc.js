const MiscModel = require('../models/misc');

const createMisc = async () => {
    try {
        await MiscModel.create({ currentGameDay: 1, isRegistrationOpen: true });

        console.log('Успешно добавлено');
    } catch (e) {
        throw new Error('Не смогли добавить misc в базу данных');
    }
}

const getMisc = async () => {
    try {
        const misc = await MiscModel.findAll();

        return misc
    } catch (e) {
        throw new Error('Не смогли добавить misc в базу данных');
    }
}

const getGameDay = async () => {
    try {
        const miscData = await MiscModel.findAll();

        return miscData[0].currentGameDay;
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли получить общие данные приложения из базы данных');
    }
}

const setGameDay = async (currentGameDay) => {
    try {
        await MiscModel.update({ currentGameDay }, { where: {} });

        console.log('Игровой день успешно обновлён');
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли обновить игровой день в базе данных');
    }
}

const openRegistration = async () => {
    try {
        await MiscModel.update({ isRegistrationOpen: true }, { where: {} });

        console.log('Регистрация открыта');
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли открыть регистрацию');
    }
}

const closeRegistration = async () => {
    try {
        await MiscModel.update({ isRegistrationOpen: false }, { where: {} });

        console.log('Регистрация закрыта');
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли закрыть регистрацию');
    }
}

const isRegistrationOpen = async () => {
    try {
        const miscData = await MiscModel.findAll();

        return miscData[0].isRegistrationOpen;
    } catch (e) {
        console.log(e);
        throw new Error('Не смогли получить данные по регистрации');
    }
}

const sync = async () => {
    try {
        await MiscModel.sync({ alter: true });
    } catch (e) {
        throw new Error('Ошибка синхронизации');
    }
}

module.exports = {
    createMisc,
    getMisc,
    getGameDay,
    setGameDay,
    sync,
    openRegistration,
    closeRegistration,
    isRegistrationOpen,
};