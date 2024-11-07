const suggestPariTemplate = async (matchId, pariCount) => {
    return {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {
                        text: `Пари с Осьминогом Паулем (Осталось ${pariCount})`,
                        callback_data: JSON.stringify({
                            type: 'SUGGEST_PARI_FOR_MATCH',
                            payload: matchId
                        })
                    }
                ]
            ]
        })
    }
}

module.exports = suggestPariTemplate;