const http= require('http');
const server= http.createServer((req,res) => {
    console.log('Headers Received:');
    console.log('host:',req.headers.host);
    console.log('user-agent:',req.headers['user-agent']);
    console.log('accept:',req.headers.accept);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Headers logged successfully');
});
server.listen(3000,() => {
    console.log('Server running at http://localhost:3000');
});
