const http= require('http');
let requestCount= 0;
setInterval(() =>{
    requestCount = 0;
}, 60 * 1000);

function logger(req, res,next){
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${req.method} ${req.url}`);
    next();
}

function auth(req, res, next){
    const token = req.headers['x-auth'];
    if(token !== 'secret123') {
        res.writeHead(401,{'Content-Type':'text/plain'});
        res.end('Unauthorized');
        return;
    }
    console.log('Auth passed');
    next();
}

function rateLimit(req, res, next){
    requestCount++;
    if(requestCount > 5) {
        res.writeHead(429,{ 'Content-Type': 'text/plain'});
        res.end('Too Many Requests');
        return;
    }
    console.log(`Rate limit: ${requestCount}/5`);
    next();
}
function runMiddlewares(req, res,middlewares){
    let index = 0;
    function next(){
        if(index < middlewares.length){
            const middleware =middlewares[index];
            index++;
            middleware(req,res,next);
        }
    }
    next();
}
const server = http.createServer((req, res) =>{
    if(req.method === 'GET' && req.url === '/secure'){
        const middlewares = [logger, auth, rateLimit];
        runMiddlewares(req,res,middlewares);
        setTimeout(() =>{
            if(!res.writableEnded){
                res.writeHead(200,{'Content-Type':'text/plain' });
                res.end('Secure Data');
                console.log('Response sent');
            }
        },0);
    }else{
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () =>{
    console.log('Server running on http://localhost:3000');
});
