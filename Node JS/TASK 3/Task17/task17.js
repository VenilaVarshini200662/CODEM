const http = require('http');
const server =http.createServer((req,res) => {
    const startTime = Date.now();
    let responseText = '';
    if(req.url ==='/' && req.method ==='GET'){
        responseText ='Home Page';
    } 
    else if(req.url ==='/api' && req.method ==='GET'){
        responseText = 'API Route';
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end('Page not found');
        return;
    }
    const endTime = Date.now();
    const responseTime= endTime - startTime;
    res.setHeader('X-Powered-By','Node.js');
    res.setHeader('X-Response-Time',responseTime + 'ms');
    res.setHeader('Content-Type','text/html');
    console.log('Response Headers Sent:');
    console.log('X-Powered-By:','Node.js');
    console.log('X-Response-Time:', responseTime + 'ms');
    console.log('Content-Type:', 'text/html');
    console.log();
    res.end(responseText);
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
