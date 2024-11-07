const sequelize = require('../../db');
const MatchDB = require('../../utils/match');

const matches = [
    {
        gameDay: 17,
        type: "play_off",
        hostId: 15,
        guestId: 21,
        startTime: 1719946800,
    },
];

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        matches.map((item) => {
            MatchDB.addMatch({
                hostId: item.hostId,
                guestId: item.guestId,
                type: item.type,
                startTime: item.startTime,
                gameDay: item.gameDay,
            })
        });
    } catch (e) {
        console.log('Не работает подключение к БД', e);
    }
}

start();