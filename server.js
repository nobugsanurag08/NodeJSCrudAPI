const http = require('http');
const movies = require("./data/movie.json")
const getReq=require('./methods/get-request')
const postReq=require('./methods/post-request')
const putReq=require('./methods/put-request')
const deleteReq=require('./methods/delete-request')
const PORT = process.env.PORT || 5001;
const server = http.createServer((req, res) => {
    req.movies = movies;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application-type/json");
            res.write(
                JSON.stringify({ title: "not found", message: "Route not found" })
            );

    }
})
server.listen(PORT, () => {
    console.log(`Server is started on: ${PORT}`);
})
