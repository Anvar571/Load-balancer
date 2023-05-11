import { ServerResponse, IncomingMessage } from "http";
import cluster from "cluster";
import HttpError from "../errors/HttpError";
import { API_ID_URL, API_URL } from "../utils/utils";

const route = (processPort: number) => {
    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        res.setHeader("Content-Type", "application/json");

        try {
            const { method, url } = req

            console.log(`Executing request: ${method} ${url} ${process.pid} on port ${processPort}`);

            if (!url?.match(API_URL) && !url?.match(API_ID_URL)){
                throw HttpError.notFound(`Invalid inpoint url ${url} method ${method}`)
            }

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