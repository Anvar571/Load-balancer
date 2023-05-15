import cluster from "cluster"
import { createServer } from "http"
import route from "./routers/route";
import balancer from "./balancer/balancer";

class Application {
    private port: number
    private CLUSTER_MODE: string
    private processPort: number;

    constructor(port: number) {
        this.port = port
        this.CLUSTER_MODE =  String(process.env.CLUSTER_MODE)
        this.processPort = Number(cluster.isPrimary ? this.port : process.env.workerPort)
    }

    private isBalancer() {
        return this.CLUSTER_MODE === "cluster" || cluster.isPrimary
    }

    public listen() {
        const server = createServer(route(this.processPort)
        )

        server.listen(this.processPort, () => {
            console.log(`Server #${process.pid} running is on port ${this.processPort}`);
        })
    }
}

export default Application