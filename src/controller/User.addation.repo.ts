import { MessageResponse, getAllMessage, Message } from "../utils/message";
import HttpError from "../errors/HttpError";
import { IUser, IUserRepo } from "../types/type";

// implement IUserRepo
class UserAddation implements IUserRepo {
    constructor() {}

    async getAll(): Promise<IUser[]> { 
        return new Promise((res, rej) => {
            process.send(getAllMessage());
            process.once(Message, this.handleResponse<IUser[]>(res, rej))
        })
    }

    async getOne(id: string): Promise<IUser> {
        
    }

    async create(user: IUser): Promise<IUser> {
        
    }

    async delete(id: string): Promise<string>{
        
    }

    async update(id: string, data: IUser): Promise<IUser>{
        
    }

    private handleResponse<T>(
        resolve: (value: T | PromiseLike<T>) => void,
        reject: (reason?: any) => void
    ) {
        return (response: MessageResponse<T>) => {
            if (response.data){
                resolve(response.data)
            }else {
                reject(HttpError.notFound(response.message))
            }
        }
    }
}

export default UserAddation