const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const server =http.createServer(async(req,res) => {
    const parsedUrl = url.parse(req.url,true);
    const name = parsedUrl.query.name || 'Guest';
    try{
        let html =await fs.readFile('template.html','utf8');
        html= html.replace('{{username}}',name);
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(html);
    }
    catch(err){
        res.writeHead(500);
        res.end('Error loading page');
    }
});
server.listen(3000,() => {
    console.log('Server running at http://localhost:3000');
});
