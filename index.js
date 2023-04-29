const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req,res)=>{
    console.log(req.url);

    let url = req.url

    let filePath = path.join(__dirname,'public',url === '/' ? 'index.html' : url)
    let extensionname = path.extname(filePath)
    let contentType = 'text/html'

    console.log("this ext",extensionname);

    switch(extensionname){
        case ".html":
            contentType = "text/html"
            break;
        case ".css":
            contentType = "text/css"
            break;
        case ".png":
            contentType = "image/png"
            break;
        case ".jpg":
            contentType = "image/jpg"
            break;
        default:
            contentType = "text/html"
    }

    fs.readFile(filePath,(err,data)=>{
        if(err){
            if(err.code == 'ENOENT'){
                fs.readFile(path.join(__dirname,'public','404.html'), (err, data)=>{
                    res.writeHead(404,{"Content-Type": "text/html"})
                    res.end(data,"utf8")
                })
            }
        }
        else{
            res.writeHead(200,{"Content-Type":contentType})
            res.end(data,"utf-8")
        }
    })

    console.log("this",filePath);
})

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{
    console.log("Server is listening on ", PORT);
})
