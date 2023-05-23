import { createMessage, deleteMessage, getAllMessage, getOneMessage, MessageResponse, updateMessage } from "../utils/message";
import { IUser, IUserRepo } from "../types/type";
import HttpError from "../errors/HttpError";

const MESSAGE = "message";

export class UserSharedRepo implements IUserRepo {
    constructor() { }

    async getAll(): Promise<IUser[]> {
        return new Promise((res, rej) => {
            process.send(getAllMessage());
            process.once(MESSAGE, this.handleResponse<IUser[]>(res, rej))
        })
    }

    async getOne(id: string): Promise<IUser> {
        return new Promise((res, rej) => {
            process.send(getOneMessage(id))
            process.once(MESSAGE, this.handleResponse<IUser>(res, rej))
        })
    }

    async create(data: IUser): Promise<IUser>{
        return new Promise((res, rej) => {
            process.send(createMessage(data))
            process.once(MESSAGE, this.handleResponse<IUser>(res, rej))
        })
    }

    async delete(id: string): Promise<string>{
        return new Promise((res, rej) => {
            process.send(deleteMessage(id));
            process.once(MESSAGE, this.handleResponse<"Delete user success">(res, rej))
        })
    }

    async update(id: string, data: IUser): Promise<IUser>{
        return new Promise((res, rej) => {
            process.send(updateMessage(id, data));
            process.once(MESSAGE, this.handleResponse<IUser>(res, rej))
        })
    }


    private handleResponse<T>(
        res: (value: T | PromiseLike<T>) => void, 
        rej: (reason?: any) => void
    ){
        return (response: MessageResponse<T>) => {
            if (response.data){
                res(response.data)
            }else {
                rej(HttpError.notFound(response.message))
            }
        }
    }
}