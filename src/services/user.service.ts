import {validate} from "uuid"
import HttpError from "../errors/HttpError";
import { IUser, IUserRepo, IUserService } from "../types/type";
import { dataValid } from "../utils/utils";

// implement with userservice
/**
 * Ma'lumotlarni validatsiya qilish uchun repo
 */
class UserService implements IUserService {
    constructor(private userRepo: IUserRepo){}

    async getAll(){
        return this.userRepo.getAll();
    }

    async getOne(id: string){
        if (!validate(id)){
            throw HttpError.badReq("This id invalid")
        }
        return this.userRepo.getOne(id);
    }

    async create(data: IUser): Promise<IUser>{
        if (!dataValid(data)) {
            throw HttpError.badReq("Sent data invalid");
        }
        
        return this.userRepo.create(data)
    }

    async delete(id: string){
        if (!validate(id)){
            throw HttpError.badReq("This id invalid")
        }
        return this.userRepo.delete(id);
    }

    async update(id: string, data: any){
        if (!validate(id)){
            throw HttpError.badReq("This id invalid")
        }
        return this.userRepo.update(id, data);
    }
}   

export default UserService