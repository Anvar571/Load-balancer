interface IUserCtrl {
    getAllUser(): Promise<IUser[]>;
    getOneUser(id: string): Promise<IUser | undefined>;
    create(user: IUser): Promise<IUser>;
    delete(id: string): Promise<string>;
    update(id: string, data: IUser): Promise<IUser>
}

interface IUser {
    id?: string,
    username: string,
    age: number,
    hobbies: []
}

export { IUserCtrl, IUser }