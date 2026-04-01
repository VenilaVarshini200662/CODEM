const http = require('http');
function parseJSON(body){
    try{
        return JSON.parse(body);
    }catch{
        throw new Error('Invalid JSON');
    }
}

function validateSchema(obj){
    if(!obj.name || !obj.age || !obj.email){
        throw new Error('Validation failed: missing fields');
    }
    return obj;
}

function transformData(obj){
    return{
        name:obj.name.toUpperCase(),
        age:obj.age,
        email:' xyz@gamil.com' 
    };
}
function buildResponse(obj){
    return `{ "success": true,"data": { "name": "${obj.name}", "age": ${obj.age}, "email": "${obj.email}" } }`;
}
const server= http.createServer((req,res) =>{
    if(req.method === 'POST' && req.url === '/process'){
        let body = '';
        req.on('data',chunk => body += chunk.toString());
        req.on('end',() =>{
            try{
                const parsed = parseJSON(body);
                const validated = validateSchema(parsed);
                const transformed = transformData(validated);
                const response = buildResponse(transformed);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(response); 
            }catch(err){
                res.writeHead(400, {'Content-Type': 'application/json'});
                res.end(`{"success": false, "error": "${err.message}"}`);
            }
        });
    }else{
        res.writeHead(404,{'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});
server.listen(3000,() => console.log('Server running on http://localhost:3000'));
