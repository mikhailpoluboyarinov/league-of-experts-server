const sequelize = require('../../db');
const UserDB = require('../../utils/user');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await UserDB.deleteUserById(27);

        console.log('Пользователь успешно удалён');
    } catch (e) {
        console.log('Не получилось удалить пользователя', e);
    }
}

start();