const http = require('http');
let jobs= [];
let jobId = 1;
function processJob(job){
    setTimeout(() =>{
        job.status= "running";
        setTimeout(() =>{
            job.status = "done";
        }, 3000);
    },1000);
}
const server= http.createServer((req, res) =>{
    if (req.method === 'POST' && req.url === '/jobs'){
        const newJob ={
            id: jobId++,
            type: "default",
            status: "queued"
        };
        jobs.push(newJob);
        processJob(newJob);
        const response= {id: newJob.id, status: "queued"};
        console.log(`POST /jobs → {id: ${response.id}, status: "queued"}`);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(response));
    }
    else if(req.method === 'GET' && req.url.startsWith('/jobs/')){
        const id= parseInt(req.url.split('/')[2]);
        const job = jobs.find(j => j.id === id);
        if(job){
            const response= {id: job.id, status: job.status};
            console.log(`GET /jobs/${job.id} → { id: ${job.id}, status: "${job.status}" }`);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(response));
        }else{
            res.writeHead(404);
            res.end('Job not found');
        }
    }
    else if(req.method === 'GET' && req.url === '/jobs'){
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.end(JSON.stringify(jobs));
    }
    else{
        res.writeHead(404);
        res.end('Not Found');
    }
});
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
