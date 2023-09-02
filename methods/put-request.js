const requestBodyParser=require('../util/body-parser');
const writeToFile=require('../util/write-tofile');

module.exports=async (req,res)=>{
    let baseURL = req.url.substring(0, req.url.lastIndexOf('/') + 1);
    let id=req.url.split('/')[3];
    let regxV4=new RegExp(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i);
    if(!regxV4.test(id)){
        res.writeHead(400,{"Content-Type":"application/json"});
        res.end(JSON.stringify({message:"UUID is ot valid"}))
    }
    else if(baseURL==='/api/movies/' && regxV4.test(id)){
        try{
            let body = await requestBodyParser(req);
            let index= req.movies.findIndex((movie)=>{
                return movie.id===id;
            })
            if(index===-1){
                res.writeHead(404,{"Content-Type":"application/json"})
                res.end(JSON.stringify({message:"ID not found"}))
            }
            else{
                req.movies[index]={id,...body}
                writeToFile(req.movies);
                res.writeHead(200,{"Content-Type":"application/json"})
                res.end(JSON.stringify(req.movies[index]))
            }
        }catch(err){
            console.log(err);
            res.writeHead(400, {"Content-Type": "application/json"});
            // res.write(JSON.stringify({ message: "Request body is not valid" }))
            res.end(JSON.stringify({ title: "Validation Failed", message: "Request body is not valid" }))
        }
    }

}