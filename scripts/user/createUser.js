const sequelize = require('../../db');
const UserDB = require('../../utils/user');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        UserDB.createUser('123')
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();