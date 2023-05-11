class HttpError extends Error {
    constructor(public status: number, public message: string){
        super()
    }

    static badReq(message: string){
        return new HttpError(400, message)
    }

    static notFound(message: string){
        return new HttpError(404, message)
    }

    static internalError(){
        return new HttpError(500, "Server some error")
    }
}

export default HttpError