const API_URL = /^\/api\/users\/?$/;
const API_ID_URL = /^\api\/users\/[^\/]+$/;

const METHODS = {
    GET: "GET",
    POST:"POST",
    PUT:"PUT",
    DELETE: "DELETE"
}

export {API_ID_URL, API_URL, METHODS}