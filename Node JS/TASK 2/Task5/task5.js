const http= require('http');
function unstableDB(){
    return new Promise((resolve, reject) =>{
        if(Math.random() < 0.7){
            reject('DB Failed');
        }else{
            resolve(['data1', 'data2', 'data3']);
        }
    });
}
function fallbackData(){
    return ['cached1', 'cached2'];
}
function fetchWithRetry(attempt = 1){
    const delays = [500, 1000, 2000];
    return unstableDB()
        .then(data =>{
            return { source: "db", data };
        })
        .catch(() =>{
            if(attempt < 3){
                const delay= delays[attempt - 1];
                console.log(`Attempt ${attempt} failed — retrying in ${delay}ms`);
                return new Promise((resolve) =>{
                    setTimeout(() =>{
                        resolve(fetchWithRetry(attempt + 1));
                    }, delay);
                });
            }
            console.log(`Attempt ${attempt} failed — using fallback`);
            return{
                source: "cache",
                data: fallbackData()
            };
        });
}

const server = http.createServer((req, res) =>{
    if(req.method === 'GET' && req.url === '/data'){
        fetchWithRetry().then(result =>{
            console.log(result);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });

    }else{
        res.writeHead(404);
        res.end('Not Found');
    }
});
server.listen(3000, () =>{
    console.log('Server running on http://localhost:3000');
});
