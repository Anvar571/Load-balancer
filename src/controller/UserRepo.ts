import { v4 as uuidv4 } from "uuid"
import HttpError from "../errors/HttpError"
import { IUser, IUserRepo} from "../types/type"

/**
 * Dbga ma'lmotlarni yozib uchun ishlatiladi
 */

class UserRepo implements IUserRepo {
    constructor(private users: IUser[]) { }

    async getAll(): Promise<IUser[]> {
        return this.users
    }

    async getOne(id: string): Promise<IUser> {
        const user = this.users.find((user) => user.id === id);
        if (!user) throw HttpError.notFound("User is not defined")

        return user
    }

    async create(user: IUser): Promise<any> {
        const newUser = { ...user, id: uuidv4() }
        
        console.log(newUser, this.users);
        
        this.users.push(newUser);

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

export default UserRepo