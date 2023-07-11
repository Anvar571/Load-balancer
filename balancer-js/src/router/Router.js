export default class Router {
    static httpMethodsWithBody = ['POST', 'PUT'];

    requests = {
        GET: {},
        POST: {},
        DELETE: {},
        PUT: {}
    };

    async handlerRequest(req, res) {
        const httpMethod = req.method;
        const requests = this.requests[httpMethod];
        const handler = this.findMatchingHandler(req, requests);

        if (handler) {
            await this.requestsWithBody(req);

            res.setHeader('Content-Type', 'application/json');
            return handler(req, res);
        } else {
            res.statusCode = 404;
            res.write("The request doesn't exist");
            res.end();
        }
    }

    async requestsWithBody(req) {
        if (Router.httpMethodsWithBody.includes(req.method)) {
            const body = (await Router.getRequestBody(req)) || {};

            req.body = body;
        }
    }

    findMatchingHandler(req, requests) {
        let handler;

        for (const path in requests) {
            const re = this.getRegexpFromPath(path);

            if (re.test(req.url)) {
                req.parameters = req.url.match(re)?.groups || {};
                handler = requests[path];
            }
        }

        return handler;
    }

    getRegexpFromPath(path) {
        const reString = path.replace(/(.*)({(.*)})/, "$1(?<$3>.*)");

        return new RegExp(reString);
    }

    get(path, handler) {
        this.requests.GET[path] = handler;
    }

    post(path, handler) {
        this.requests.POST[path] = handler;
    }

    put(path, handler) {
        this.requests.PUT[path] = handler;
    }

    delete(path, handler) {
        this.requests.DELETE[path] = handler;
    }

    static getRequestBody(req) {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString(); // convert Buffer to string
        });

        return new Promise((res, rej) => {
            req.on("end", () => {
                try {
                    const requestBody = JSON.parse(body);
                    res(requestBody);
                } catch (err) {
                    rej(err);
                }
                res();
            });

            req.on("error", (err) => {
                rej(err);
            });
        });
    }

    getInstance() {
        return this;
    }
}