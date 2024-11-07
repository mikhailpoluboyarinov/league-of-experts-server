const template = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Сделать прогноз на победителя',
                    callback_data: JSON.stringify({
                        type: 'MAKE_PREDICTION_WINNER_CUP',
                    })
                }
            ]
        ]
    })
}

module.exports = template;