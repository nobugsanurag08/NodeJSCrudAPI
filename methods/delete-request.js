const movie = require('../data/movie.json')
const writeToFile = require('../util/write-tofile')
module.exports = (req, res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let id = req.url.split('/')[3];
    let regxV4 = new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i);
    if (!regxV4.test(id)) {
        res.writeHead(404, ("Content-Type", "application/json"));
        res.end(JSON.stringify({ title: "Validation is failed", message: "UUID not matched" }));
    }
    else if (baseURL === '/api/movies/' && regxV4.test(id)) {
        let index = req.movies.findIndex((movie) => {
            return movie.id === id;
        })
        // console.log(index);
        if (index === -1) {
            res.statusCode = 404;
            res.write(JSON.stringify({ title: "Not Found", message: "Movie not found" }))
            res.end();
        }
        else {
            req.movies.splice(index, 1);
            writeToFile(req.movies);
            res.statusCode = 204;
            res.setHeader("Content-Type","application/json")
            res.write(JSON.stringify({message: "Deleted successfully" }));
            res.end();
            // res.writeHead(204,{"Content-Type":"application/json"});
            // res.end(JSON.stringify(req.movies))
        }
    }
}