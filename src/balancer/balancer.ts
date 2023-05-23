import os from "os";
import { IncomingMessage, request, ServerResponse } from "http"
import UserRepo from "../controller/UserRepo";
import cluster from "cluster";
import HttpError from "../errors/HttpError";
import {MESSAGE} from "../utils/message"

const balancer = (port: number) => {
    const core = os.cpus().length
    const userRepo = new UserRepo([]);

    const workerPorts = new Array(core)
    .fill(null)
    .map((_, index) => {
        const workerPort = port + index + 1;

        const worker  = cluster.fork({workerPort});

        worker.on("message", async (message: MESSAGE) => {
            const userRepoMethod = userRepo[message.action];    
            const args = "args" in message ? message.args : [];

            userRepoMethod.apply(userRepo, args)
            .then((data: Awaited<ReturnType<typeof userRepoMethod>>) => {
                worker.send({data})
            }).catch((err: HttpError) => {
                worker.send({status: err.status, message: err.message})
            })
        })

        return workerPort
    }) 

    let nextPortIndex = 0;  
    
    return (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
        const port = workerPorts[nextPortIndex++ % core];
        const connector = request(
            {
                host: "http://localhost:4000",
                path: req.url,
                method: req.method,
                headers: req.headers,
                port
            }, (response) => {  
                res.statusCode = response.statusCode || 404;
                res.setHeader("Content-Type", "application/json");
                response.pipe(res)
            }
        )
        req.pipe(connector)
    }
}

export default balancer