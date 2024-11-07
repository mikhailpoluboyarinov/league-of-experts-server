const MatchModel = require('../models/match');
const CountryModel = require('../models/country');
const flags = require('../flags');

const setMatchScore = async (matchId) => {
    try {
        const match = await MatchModel.findOne({ where: { id: matchId } });
        const countriesData = await CountryModel.findAll();
        const countries = countriesData.reduce((acc, item) => {
            acc[item.id] = {
                name: item.name,
                nameRus: item.nameRus,
                code: item.code,
            };

            return acc;
        }, {});
        const hostCode = countries[match.hostId].code
        const guestCode = countries[match.guestId].code

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: flags[hostCode] + ' 1 - 0 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_1-0'
                            })
                        },
                        {
                            text: flags[hostCode] + ' 2 - 0 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_2-0'
                            })
                        },
                        {
                            text: flags[hostCode] + ' 2 - 1 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_2-1'
                            })
                        },
                    ],
                    [
                        {
                            text: flags[hostCode] + ' 0 - 1 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_0-1'
                            })
                        },
                        {
                            text: flags[hostCode] + ' 0 - 2 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_0-2'
                            })
                        },
                        {
                            text: flags[hostCode] + ' 1 - 2 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_1-2'
                            })
                        },
                    ],
                    [
                        {
                            text: flags[hostCode] + ' 0 - 0 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_0-0'
                            })
                        },
                        {
                            text: flags[hostCode] + ' 1 - 1 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_1-1'
                            })
                        },
                        {
                            text: flags[hostCode] + ' 2 - 2 ' + flags[guestCode],
                            callback_data: JSON.stringify({
                                type: 'SET_MATCH_SCORE',
                                payload: matchId + '_2-2'
                            })
                        },
                    ],
                    [
                        {
                            text: 'Свой прогноз на счёт',
                            callback_data: JSON.stringify({
                                type: 'CHOOSE_MATCH_SCORE_CUSTOM',
                                payload: matchId
                            })
                        },
                    ]
                ],
            })
        };
    } catch (e) {
        console.log(e);
    }
}

module.exports = setMatchScore;