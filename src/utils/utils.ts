import { IncomingMessage } from "http"
import cluster from "cluster"
import { IUser } from "../types/type"
import HttpError from "../errors/HttpError"

const getId =(url: string) => {
    const id = url.match(/\/api\/users\/([\w-]+)/);
    return id ? id[1] : null
}

async function getBodyData(req: IncomingMessage) {
    try {
        const buffer: Uint8Array[] = []

        req.on("data", (data: Uint8Array) => {
            buffer.push(data)
        }).on("end", () => {
            const body = Buffer.concat(buffer).toString().trim();
            return body ? JSON.parse(body) : {}
        }).on("error", (err) => {
            throw new Error(err.message)
        })

    } catch (error: any) {
        throw HttpError.badReq(error)
    }
}

function dataValid(data: IUser) {
    return (
        typeof data.username == "string" &&
        typeof data.age == "number" &&
        Array.isArray(data.hobbies) &&
        data.hobbies.every((hoobie) => hoobie == "string")
    )
}

function processStatus() {
    return process.env.CLUSTER_MODE === "cluster"
        ? cluster.isPrimary
            ? "Primary" : "Worker" : "Server"
}

export { dataValid, processStatus, getBodyData, getId }