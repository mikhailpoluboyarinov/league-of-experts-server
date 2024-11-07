const sequelize = require('../../db');
const MiscDB = require('../../utils/misc');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await MiscDB.openRegistration();
    } catch (e) {
        console.log(e);
        console.log('Не получилось открыть регистрацию', e);
    }
}

start();