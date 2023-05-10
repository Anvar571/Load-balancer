import cluster from "cluster"
import { createServer } from "http"

class Application {
    private port: number
    private CRUD_API_MODE: string = String(process.env)
    private processPort: number;

    constructor(port: number) {
        this.port = port
        this.processPort = Number(cluster.isPrimary ? this.port : process.env.workerPort)

    }

    private isBalancer() {
        return this.CRUD_API_MODE === "cluster" || cluster.isPrimary
    }

    public listen() {
        const server = createServer(this.isBalancer() ? balancer(this.processPort) : routers(this.processPort))
        server.listen(this.processPort, () => {
            console.log(`Server ${process.pid} running is on port ${processPort}`);
        })
    }

}

export default Application