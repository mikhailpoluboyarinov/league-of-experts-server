const sequelize = require('../../db');
const MiscDB = require('../../utils/misc');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await MiscDB.closeRegistration();
    } catch (e) {
        console.log(e);
        console.log('Не получилось закрыть регистрацию', e);
    }
}

start();