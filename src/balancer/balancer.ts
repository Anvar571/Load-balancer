import { IncomingMessage, ServerResponse } from "http"

const balancer = (port: number) => {
    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {

    }
}

export default balancer