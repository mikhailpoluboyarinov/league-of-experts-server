const sequelize = require('../../db');
const MiscDB = require('../../utils/misc');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const miscData = await MiscDB.getGameDay();

        console.log('Сейчас игровой день:', miscData[0].currentGameDay);
    } catch (e) {
        console.log(e);
        console.log('Не получилось достать игровой день', e);
    }
}

start();