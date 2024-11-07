const template = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [
                {
                    text: 'Сделать прогноз',
                    callback_data: JSON.stringify({
                        type: 'MAKE_PREDICTION_MATCH',
                    })
                }
            ]
        ]
    })
}

module.exports = template;