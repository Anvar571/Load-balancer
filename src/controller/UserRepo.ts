// req res incommingMessage getBody

import { IncomingMessage, ServerResponse } from "http";
import { IUserCtrl } from "../types/type";
import { getId } from "../utils/utils";

class UserRoute {
    constructor(private userService: IUserCtrl){        
    }

    async getAll(_: IncomingMessage, res: ServerResponse<IncomingMessage>) {
        const users = await this.userService.getAllUser();
        
    }

    async getOne(req: IncomingMessage, res: ServerResponse<IncomingMessage>){
        const id = getId(String(req.url));
        const user = await this.userService.getOneUser(String(id));

    }

    private sendResponse<T>(
        res: ServerResponse<IncomingMessage>,
        data: T,
        status: 400
    ) {
        res.statusCode = status
        res.end(JSON.stringify(data));
    }
}

export default UserRoute