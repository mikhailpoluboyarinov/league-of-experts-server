const MatchDB = require('../utils/match');
const CountryDB = require('../utils/country');
const MiscDB = require('../utils/misc');
const flags = require('../flags');

const getChooseMatchTemplate = async (userId) => {
    try {
        const currentGameDay = await MiscDB.getGameDay();
        const allMatchesInGameDay = await MatchDB.getMatchesByGameDayId(currentGameDay);
        const availableMatches = allMatchesInGameDay.filter(match => {
            return (match.startTime * 1000 > Date.now()) && !match.isClosedForPrediction;
        });
        const countriesData = await CountryDB.getAllCountries();
        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = {
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
            };

            return acc;
        }, {});

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: availableMatches.map(match => {
                    const hostName = countries[match.hostId].nameRus;
                    const guestName = countries[match.guestId].nameRus;
                    const hostFlag = flags[countries[match.hostId].code];
                    const guestFlag = flags[countries[match.guestId].code];

                    return [
                        {
                            text: `${hostFlag} ${hostName} - ${guestFlag} ${guestName}`,
                            callback_data: JSON.stringify({
                                type: 'CHOOSE_MATCH',
                                payload: match.id,
                            })
                        }
                    ];
                }),
            })
        };
    } catch (e) {
        throw new Error('Ошибка выбора матча');
    }
}

module.exports = getChooseMatchTemplate;