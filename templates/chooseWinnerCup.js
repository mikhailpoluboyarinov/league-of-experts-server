const CountryModel = require('../models/country');
const flags = require('../flags');

const getWinnerCupTemplate = async () => {
    try {
        const countriesData = await CountryModel.findAll();

        return {
            reply_markup: JSON.stringify({
                inline_keyboard: countriesData.map(country => {
                    return [
                        {
                            text: flags[country.code] + ' ' + country.nameRus,
                            callback_data: JSON.stringify({
                                type: 'CHOOSE_WINNER_CUP',
                                payload: country.id,
                            })
                        }
                    ];
                }),
            })
        };
    } catch (e) {
        console.log(e);
    }
}

module.exports = getWinnerCupTemplate;