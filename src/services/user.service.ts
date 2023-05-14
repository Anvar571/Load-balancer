import {validate} from "uuid"
import HttpError from "../errors/HttpError";
import { IUser, IUserCtrl } from "../types/type";
import { dataValid } from "../utils/utils";

class UserService {
    constructor(private userCtrl: IUserCtrl){}

    async getAllUser(){
        return this.userCtrl.getAllUser();
    }

    async getOneUser(id: string){
        if (!validate(id)){
            throw HttpError.badReq("This id invalid")
        }
        return this.userCtrl.getOneUser(id);
    }

    async create(data: IUser){
        if (!dataValid(data)){
            throw HttpError.badReq("User data invalid")
        }
        return this.userCtrl.create(data)
    }

    async deleteUser(id: string){
        if (!validate(id)){
            throw HttpError.badReq("This id invalid")
        }
        return this.userCtrl.delete(id);
    }

    async updateUser(id: string, data: IUser){
        if (!validate(id)){
            throw HttpError.badReq("This id invalid")
        }
        return this.userCtrl.update(id, data);
    }
}   

export default UserService