import { ServerResponse, IncomingMessage } from "http";
import cluster from "cluster";
import HttpError from "../errors/HttpError";
import { processStatus } from "../utils/utils";
import UserService from "../services/user.service";
import {API_ID_URL, API_URL, METHODS} from "./constants"
import UserAddation from "../controller/User.addation.repo";
import UserRepo from "../controller/UserRepo";
import UserController from "../controller/User.ctrl";

const route = (processPort: number) => {
    const UserRoutes = cluster.isPrimary
        ? new UserAddation() 
        : new UserRepo([]);
    
    const userService = new UserService(UserRoutes);
    const userCtrl = new UserController(userService)
    const getProcessStatus = processStatus();

    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        res.setHeader("Content-Type", "application/json");

        try {
            const { method, url } = req

            console.log(`Executing request: ${method} ${url} -- ${getProcessStatus} #${process.pid} on port ${processPort}`);

            if (!url?.match(API_URL) && !url?.match(API_ID_URL)){
                throw HttpError.notFound(`Invalid inpoint url ${url} method ${method}`)
            }

            switch(method){
                case METHODS.GET:
                    await userCtrl.getAll(req)
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
                    throw HttpError.internalError()
            }

        } catch (error) {

        }
    }
}

export default route