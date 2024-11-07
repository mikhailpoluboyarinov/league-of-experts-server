const sequelize = require('../../db');
const MiscDB = require('../../utils/misc');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await MiscDB.sync();
        await MiscDB.createMisc();
    } catch (e) {
        console.log(e);
        console.log('Не получилось установить игровой день', e);
    }
}

start();