process.USERS = [];

const getAllUSer = async () => process.USERS;

const getOneUser = async (userId) => process.USERS.find((user) => user.id == userId);

const addUser = async (userData) => {
    process.USERS.push(userData);

    return userData;
}

const updateUser = async (id, data) => {
    const user = await getOneUser(id);

    return Object.assign(user, data);
}

const deleteOne = async (userId) => {
    let deletedUser;
    const userIndexToDelete = process.USERS.findIndex((user) => user.id === userId);

    if (userIndexToDelete > -1) {
        deletedUser = process.USERS.splice(userIndexToDelete, 1)[0];
    }
    return deletedUser;
}

export default {
    getAllUSer,
    getOneUser,
    addUser,
    updateUser,
    deleteOne
}