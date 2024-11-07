const sequelize = require('../../db');
const UserDB = require('../../utils/user');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await UserDB.deleteUsers();

        console.log('Пользователи успешно удалёны');
    } catch (e) {
        console.log('Не получилось удалить пользователей', e);
    }
}

start();