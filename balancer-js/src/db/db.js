process.USERS= [
    {
        id: 1,
        username: "anvar",
    },
    {
        id: 2,
        username: "anvar",
    },
    {
        id: 3,
        username: "anvar",
    },
    {
        id: 4,
        username: "anvar",
    },
    {
        id: 5,
        username: "anvar",
    },
];

const getAllUSer =  async () => process.USERS;

const getOneUser =  async(userId) => process.USERS.find((user) => user.id == userId);

const addUser = async (userData) => {
    return process.USERS.push(userData);
}

const updateUser = async (id, data) => {
    const user = await getOneUser(id);

    return Object.assign(user, data);
}

const deleteOne = async (id) => {
    const user = process.USERS.findIndex((user) => user.id === id);

    if (user > -1){
        return process.USER.splice(user, 1);
    }
}

export default {
    getAllUSer,
    getOneUser,
    addUser,
    updateUser,
    deleteOne
}