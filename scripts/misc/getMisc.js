const sequelize = require('../../db');
const MiscDB = require('../../utils/misc');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await MiscDB.sync();
        await MiscDB.getMisc();
    } catch (e) {
        console.log(e);
        console.log('Ошибка получения общих данных приложения', e);
    }
}

start();