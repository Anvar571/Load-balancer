import { ServerResponse, IncomingMessage } from "http";
import cluster from "cluster";
import HttpError from "../errors/HttpError";
import { API_ID_URL, API_URL, processStatus } from "../utils/utils";
import UserController from "../controller/UserController";
import UserService from "../services/user.service";
import UserRoute from "../controller/UserRoute";

const route = (processPort: number) => {
    const UserRoutes = cluster.isPrimary 
        ? new UserController([]) 
        : new UserController([])
    const userService = new UserService(UserRoutes);
    const userCtrl = new UserRoute(userService)
    const getProcessStatus = processStatus();

    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        res.setHeader("Content-Type", "application/json");

        try {
            const { method, url } = req

            console.log(`Executing request: ${method} ${url} -- ${getProcessStatus} ${process.pid} on port ${processPort}`);

            if (!url?.match(API_URL) && !url?.match(API_ID_URL)){
                throw HttpError.notFound(`Invalid inpoint url ${url} method ${method}`)
            }

            console.log(method, url);
            
            switch(method){
                case "":
                    
                default:
                    throw HttpError.internalError()
            }

        } catch (error) {

        }
    }
}

export default route