import { IncomingMessage, ServerResponse } from "http"
import { getBodyData, getId } from "../utils/utils";
import { HttpCode, IUserController, IUserService } from "../types/type";
import UserService from "../services/user.service";


/**
 * Ma'lumotlarni olamiz
 */

class UserController implements IUserController {
    constructor(private userService: IUserService) { }

    async getAll(_: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const users = await this.userService.getAll();
        this.sendResponse(res, users);
    }

    async getOne(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const id = getId(String(req.url));
        const user = await this.userService.getOne(String(id));
        this.sendResponse(res, user)
    };

    async create(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const body = await getBodyData(req);

        const newUser = await this.userService.create(body);
        
        this.sendResponse(res, newUser, HttpCode.CREATE);
    };

    async delete(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const id = getId(String(req.url));
        const result = await this.userService.delete(String(id));
        
        this.sendResponse(res, result, HttpCode.NO_CONTENT)
    };

    async update(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const id = getId(String(req.url));
        const body = await getBodyData(req);
        const user = await this.userService.update(String(id), body);
        this.sendResponse(res, user)
    }

    private sendResponse<T>(
        res: ServerResponse<IncomingMessage>,
        data: T,
        status: HttpCode = HttpCode.OK
    ) {
        res.statusCode = status
        res.end(JSON.stringify(data))
    }
}

export default UserController