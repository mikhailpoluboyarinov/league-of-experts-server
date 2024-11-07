const sequelize = require('../../db');
const UserDB = require('../../utils/user');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await UserDB.sync();

        console.log('Модель юзеров успешно синхронизирована');
    } catch (e) {
        console.log('Не получилось синхронизировать модель юзеров', e);
    }
}

start();