const sequelize = require('../../db');
const UserDB = require('../../utils/user');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await UserDB.updateUserById(1, { firstName: 'John', lastName: 'Smith' });
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();