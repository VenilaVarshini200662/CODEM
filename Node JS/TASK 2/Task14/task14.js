const http= require('http');
let stats ={
  totalRequests: 0,
  successCount: 0,
  errorCount: 0,
  totalResponseTime: 0
};
function getAvgResponseTime(){
  if(stats.totalRequests === 0) 
    return '0ms';
  return Math.round(stats.totalResponseTime / stats.totalRequests) + 'ms';
}
const server = http.createServer((req, res) =>{
  const startTime= Date.now();
  stats.totalRequests++;
  if (req.method === 'GET' && req.url === '/hello'){
    const delay = Math.floor(Math.random() * 401) + 100;
    setTimeout(() => {
      stats.successCount++;
      const duration = Date.now() - startTime;
      stats.totalResponseTime += duration;
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World!');
    },delay);
  }
  else if(req.method === 'GET' && req.url === '/fail'){
    stats.errorCount++;
    const duration = Date.now() - startTime;
    stats.totalResponseTime += duration;
    res.writeHead(500,{'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  }
  else if(req.method === 'GET' && req.url === '/stats'){
    const duration = Date.now() - startTime;
    stats.totalResponseTime += duration;
    const response ={
      totalRequests: stats.totalRequests,
      successCount: stats.successCount,
      errorCount: stats.errorCount,
      avgResponseTime: getAvgResponseTime()
    };
    res.writeHead(200,{'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
  }
  else{
    res.writeHead(404,{'Content-Type':'text/plain'});
    res.end('Not Found');
  }
});
server.listen(3000,() => console.log('Server running on http://localhost:3000'));
