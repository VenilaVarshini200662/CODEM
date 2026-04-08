const http = require('http');
const fs = require('fs');
const server= http.createServer((req,res) => {
    if(req.url === '/csv'){
        const stream = fs.createReadStream('data.csv');
        res.writeHead(200,{
            'Content-Type':'text/csv',
            'Content-Disposition':'attachment; filename=data.csv'
        });
        stream.pipe(res);
        stream.on('error',(err) => {
            res.writeHead(500);
            res.end('Error reading CSV file');
        });
    } 
    else{
        res.writeHead(404);
        res.end('Page not found');
    }
});
server.listen(3000,() => {
    console.log('Server running at http://localhost:3000');
});
