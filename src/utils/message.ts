import { IUser } from "../types/type";

export const deleteMessage = (id: string) => ({
    action: "delete",
    args: [id]
})

export type DeleteMessage = ReturnType<typeof deleteMessage>

export const createMessage = (data: IUser) => ({
    action: "create",
    args: [data]
})

export type CreateMessage = ReturnType<typeof createMessage>

export const getOneMessage = (id: string) =>  ({
    action: "getOne",
    args: [id]
})

export type GetOneMessage = ReturnType<typeof getOneMessage>

export const getAllMessage = () => ({
    action: "getAll"
})

export type GetAllMessage = ReturnType<typeof getAllMessage>

export const updateMessage = (id: string, user: IUser) => ({
    action: 'update',
    args: [id, user]
})

export type UpdateMessage = ReturnType<typeof updateMessage>

export type Message = | GetAllMessage | GetOneMessage | CreateMessage |DeleteMessage |UpdateMessage;

export type MessageValidResponse<T> = {
    data: T
}

export type MessageErrorResponse = {
    status: number,
    message: string
}

export type MessageResponse<T> = MessageValidResponse<T> & MessageErrorResponse;