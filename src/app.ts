import cluster from "cluster"
import { createServer } from "http"
import route from "./routers/route";
import balancer from "./balancer/balancer";

class Application {
    private port: number
    private CLUSTER_MODE = String(process.env.CLUSTER_MODE)
    private processPort: number;

    constructor(port: number) {
        this.port = port
        this.processPort = Number(cluster.isPrimary ? this.port : process.env.workerPort)

    }

    private isBalancer() {
        return this.CLUSTER_MODE === "cluster" && cluster.isPrimary
    }

    public listen() {
        const server = createServer(this.isBalancer() ? balancer(this.processPort): route(this.processPort)
        )

        server.listen(this.processPort, () => {
            console.log(`Server #${process.pid} running is on port ${this.processPort}`);
        })
    }
}

export default Application