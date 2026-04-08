const http = require('http');
const fs= require('fs');
const server= http.createServer((req,res) => {
    if(req.url ==='/image'){
        const stream= fs.createReadStream('image.jpg');
        res.writeHead(200,{'Content-Type':'image/jpeg'});
        stream.pipe(res);
        stream.on('error',(err) =>{
            res.writeHead(500);
            res.end('Error loading image');
        });
    }
    else{
        res.writeHead(404);
        res.end('Page not found');
    }
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
