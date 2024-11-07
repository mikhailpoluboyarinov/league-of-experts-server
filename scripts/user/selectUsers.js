const sequelize = require('../../db');
const UserDB = require('../../utils/user');

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const users = await UserDB.getAllUsers();

        console.log('users', users.map(item => {
            return {
                id: item.id,
                name: item.firstName + ' ' + item.lastName,
                isLastWinner: item.lastWinner,
                winnerCount: item.winnerCount,
                regStatus: item.regStatus,
            };
        }));
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();