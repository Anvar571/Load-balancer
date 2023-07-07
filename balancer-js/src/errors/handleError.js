
const serverErrorHandler = (res) => {
    res.statusCode = 500;
    res.write("Something was wrong on server side");
    res.end();
}

class ErrorHandler extends Error {
    constructor(status, message) {
        super()
    }

    static badReq(status, message) {
        res.statusCode = status;
        res.write(message);
        res.end();
    }
}

export { serverErrorHandler, ErrorHandler }