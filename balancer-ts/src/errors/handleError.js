
function serverErrorHandler(res){
    res.statusCode = 500;
    res.write("Something was wrong on server side");
    res.end();
}

module.exports = {serverErrorHandler}