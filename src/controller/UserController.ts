import { v4 as uuidv4 } from "uuid"
import HttpError from "../errors/HttpError"

export interface IUserCtrl {
    getAllUser(): Promise<IUser[]>;
    getOneUser(id: string): Promise<IUser | undefined>;
    create(user: IUser): Promise<IUser>;
    delete(id: string): Promise<string>;
    update(id: string, data: IUser): Promise<IUser>
}

export interface IUser {
    id?: string,
    username: string,
    age: number,
    hobbies: []
}

class UserController implements IUserCtrl {
    constructor(private users: IUser[]) { }

    async getAllUser(): Promise<IUser[]> {
        return this.users
    }

    async getOneUser(id: string): Promise<IUser | undefined> {
        const user = this.users.find((user) => user.id === id);
        if (!user) throw HttpError.notFound("User is not defined")

        return user
    }

    async create(user: IUser): Promise<IUser> {
        const newUser = { ...user, id: uuidv4() }
        this.users.push(newUser)
        return newUser
    }

    async delete(id: string): Promise<string>{
        const findUser = this.users.find((user) => user.id === id);
        if (!findUser) throw HttpError.notFound("User is not defined")
        this.users.splice(this.users.indexOf(findUser), 1);
        return "User deleted success"
    }

    async update(id: string, data: IUser): Promise<IUser>{
        const findUser = this.users.find((user) => user.id === id);
        if (!findUser) throw HttpError.notFound("User is not defined");

        const updateUser = {...data, id: uuidv4()}
        this.users.splice(this.users.indexOf(findUser), 1, updateUser)
        return updateUser
    }
}

export default UserController