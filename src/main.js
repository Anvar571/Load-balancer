import { createServer } from "http";
import { config } from "./config/config.js";

import userRoute from "./router/user.route.js";
import { serverErrorHandler as ServerError } from "./errors/handleError.js";

const { PORT } = config;

export default async () => {
    const responseHandler = async (req, res) => {
    console.log("The request was handled on port: " + PORT);

        try {
            await userRoute.handlerRequest(req, res);
        } catch (error) {
            ServerError(res);
        }
    };

    const server = createServer(responseHandler);

    return await new Promise((res, rej) => {
        server.listen(PORT, async () => {
            console.log(`Server is listening on port ${PORT}`);
            res(server);
        })
    })
}