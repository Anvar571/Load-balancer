import { IncomingMessage, ServerResponse } from "http"

const balancer = (port: number) => {
    console.log("slo");
    
    return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {

    }
}

export default balancer