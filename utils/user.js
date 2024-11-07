const UserModel = require('../models/user');

const createUser = async (chatId) => {
    try {
        return UserModel.create({ chatId });
    } catch (e) {
        throw new Error('Ошибка создания юзера в базе');
    }
}

const getUserByChatId = async (chatId) => {
    try {
        return UserModel.findOne({ where: { chatId } });
    } catch (e) {
        throw new Error("Ошибка получения юзера из базы");
    }
}

const updateUser = async (data, chatId) => {
    try {
        return UserModel.update(data, { where: { chatId }});
    } catch (e) {
        throw new Error('Ошибка обновления данных юзера в базе');
    }
}

const updateUserById = async (id, data) => {
    try {
        return UserModel.update(data, { where: { id }});
    } catch (e) {
        throw new Error('Ошибка обновления данных юзера в базе');
    }
}

const getAllUsers = async () => {
    try {
        return await UserModel.findAll();
    } catch (e) {
        throw new Error('Ошибка поиска всех юзера в базе');
    }
}

const sync = async () => {
    UserModel.sync({ alter: true });
}

const deleteUsers = async () => {
    try {
        await UserModel.destroy({
            where: {},
            truncate: { cascade: true, restartIdentity: true }
        });
    } catch(e) {
        console.log(e);
        throw new Error('Ошибка удаления всех юзеров из базы');
    }
}

const deleteUserById = async (id) => {
    try {
        await UserModel.destroy({ where: { id } });
    } catch(e) {
        console.log(e);
        throw new Error('Ошибка удаления юзера из базы по id');
    }
}

module.exports = {
    createUser,
    getUserByChatId,
    updateUser,
    getAllUsers,
    sync,
    deleteUsers,
    deleteUserById,
    updateUserById,
};