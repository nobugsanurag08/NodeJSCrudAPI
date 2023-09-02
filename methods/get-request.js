module.exports = (req, res) => {
    let baseURL = req.url.substring(0, req.url.lastIndexOf("/") + 1)
    // console.log(baseURL);
    let id=req.url.split('/')[3];
    let regxV4=new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i);

    if (req.url === '/api/movies') {
        // console.log(req.url.split);
        res.statusCode = 200;
        res.setHeader = ("Content-Type", "application/json")
        res.write(JSON.stringify(req.movies))
        res.end();
    }
    else if(!regxV4.test(id)){
        res.writeHead(404, ("Content-Type", "application/json"));
        res.end(JSON.stringify({ title: "Validation is failed", message: "UUID not matched" }))
    }
    else if( baseURL==='/api/movies/'&& regxV4.test(id)){
        res.setHeader=("Content-Type", "application/json");
        let filteredmovie=req.movies.filter((movie)=>{
            // console.log(movie.id," ",id);
            return movie.id === id;
        })
        // console.log(filteredmovie.length);
        if(filteredmovie.length > 0){
            res.statusCode=200;
            res.write(JSON.stringify(filteredmovie))
            res.end()
        }else{
            res.writeHead(404, ("Content-Type", "application/json"));
            res.end(JSON.stringify({ title: "not found", message: "Movie not found" }))
        }
    }
    else {
        res.writeHead(404, ("Content-Type", "application/json"));
        res.end(JSON.stringify({ title: "not found", message: "Route not found" }))
    }
}