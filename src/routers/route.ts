import { ServerResponse, IncomingMessage } from "http";
import cluster from "cluster";
import HttpError from "../errors/HttpError";
import { processStatus } from "../utils/utils";
import UserService from "../services/user.service";
import {API_ID_URL, API_URL, METHODS} from "./constants"
import UserRepo from "../controller/UserRepo";
import UserController from "../controller/User.ctrl";

const route = (processPort: number) => {
    const userService = new UserService(new UserRepo([]));
    
    const userCtrl = new UserController(userService)
    const getProcessStatus = processStatus();

    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        res.setHeader("Content-Type", "application/json");

        try {
            const { method, url } = req

            console.log(`Executing request: ${method} ${url} -- ${getProcessStatus} #${process.pid} on port ${processPort}`);

            if (!url?.match(API_URL) && !url?.match(API_ID_URL)){
                throw HttpError.notFound(`Invalid inpoint url ${url} method ${method}.\n should be /api/users`)
            }

            switch(method){
                case METHODS.GET:
                    console.log(url.match(API_ID_URL));
                    
                    if (url.match(API_ID_URL)){
                        await userCtrl.getOne(req, res)
                    }else {
                        await userCtrl.getAll(req, res)
                    }
                    break;
                case METHODS.POST:
                    await userCtrl.create(req, res)
                    break;
                case METHODS.DELETE:
                    await userCtrl.delete(req, res);
                    break;
                case METHODS.PUT:
                    await userCtrl.update(req, res);
                    break
                default:
                    throw HttpError.internalError();
            }

        } catch (error) {
            const {status, message} = error instanceof HttpError ? error: HttpError.internalError();

            res.statusCode = status;
            res.end(JSON.stringify({message}))
        }
    }
}

export default route