const http = require('http');
let activeRequests= 0;   
const MAX_CONCURRENT = 2;
let queue= [];     
let requestId= 0;        
function processRequest(req,res, id){
    activeRequests++;
    console.log(`Request ${id}: processing`);
    const startTime = Date.now();
    new Promise((resolve) =>{
        setTimeout(resolve, 1000);
    }).then(() => {
        const timeTaken= Date.now() - startTime;
        console.log(`Request ${id}: done in ${timeTaken}ms`);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Request ${id} completed`);
        activeRequests--;
        if(queue.length > 0){
            const next= queue.shift();
            processRequest(next.req, next.res, next.id);
        }
    });
}
const server= http.createServer((req, res) =>{
    requestId++;
    const id= requestId;
    if(activeRequests < MAX_CONCURRENT){
        processRequest(req, res, id);
    }else{
        console.log(`Request ${id}: queued(waiting)`);
        queue.push({ req, res, id });
    }
});

server.listen(3000, () =>{
    console.log('Server running on http://localhost:3000');
});
