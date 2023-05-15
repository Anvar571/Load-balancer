import { IncomingMessage, ServerResponse } from "http";

export const enum HttpCode {
    OK=200,
    CREATE=201,
    NOT_FOUND=404,
    NO_CONTENT=204,
    BAD_REQUEST=400
}

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
    hobbies: string[]
}

export interface IUserService {
    getAll: () => Promise<IUser[]>,
    getOne: (id: string) => Promise<IUser>,
    create: (user: any) => Promise<IUser>,
    delete: (id: string) => Promise<string>,
    update: (id: string, user: any) => Promise<IUser>
}

export interface IUserRepo {
    getAll: () => Promise<IUser[]>,
    getOne: (id: string) => Promise<IUser>,
    create: (user: IUser) => Promise<IUser>,
    delete: (id: string) => Promise<string>,
    update: (id: string, user: IUser) => Promise<IUser>
}

type Handler = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>
) => Promise<viod>

export interface IUserController {
    getAll: Handler,
    getOne: Handler,
    create: Handler,
    delete: Handler,
    update: Handler
}
