const requestBodyParser = require('../util/body-parser')
const writeToFile=require('../util/write-tofile');
const crypto = require('crypto');
module.exports = async (req, res) => {
    if (req.url === '/api/movies') {
        try {
            // console.log("response Body",req.body);
            const body = await requestBodyParser(req);
            // console.log(body);
            const id = crypto.randomUUID();
            body.id = id;
            // console.log(body);
            req.movies.push(body);
            writeToFile(req.movies)
            res.statusCode=201;
            res.setHeader("Content-Type","application/json")
            // res.writeHead(201, { 'Content-Type': "application/json" });
            res.write(JSON.stringify({ message: "Successfully Created" }))
            res.end()
        } catch(err) {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.write(JSON.stringify({ message: "Request body is not valid" }))
            res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }))
        }
    }
}