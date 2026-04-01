const http = require('http');
function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
function receiveChunks(req){
  return new Promise((resolve, reject) =>{
    const chunks = [];
    req.on('data',chunk => chunks.push(chunk));
    req.on('end',() => {
      const buffer = Buffer.concat(chunks);
      resolve(buffer);
    });
    req.on('error', err => reject(err));
  });
}
function validateFile(buffer){
  const MAX_SIZE = 1 * 1024 * 1024; 
  return new Promise((resolve, reject) =>{
    if (buffer.length > MAX_SIZE){
      reject(new Error('File too large'));
    }else{
      resolve(buffer);
    }
  });
}

function scanFile(buffer){
  return delay(500).then(() => buffer); 
}

function saveFile(buffer){
  return delay(300).then(() => 'photo.jpg'); 
}

function generateThumbnail(buffer){
  return delay(300).then(() => 'thumb_photo.jpg'); 
}

const server = http.createServer(async(req, res) => {
  if(req.method === 'POST' && req.url === '/upload'){
    try{
      const buffer= await receiveChunks(req);
      await validateFile(buffer);
      await scanFile(buffer);
      const [filename,thumbnail] = await Promise.all([
        saveFile(buffer),
        generateThumbnail(buffer)
      ]);
      const sizeKB = Math.round(buffer.length / 1024);
      const response = {
        success: true,
        filename,
        size: `${sizeKB}KB`,
        thumbnail
      };
      res.writeHead(200, {'Content-Type':'application/json'});
      res.end(JSON.stringify(response, null, 2));
    }catch(err){
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  }
  else{
    res.writeHead(404, {'Content-Type':'text/plain'});
    res.end('Not Found');
  }
});
server.listen(3000,() => console.log('Server running on http://localhost:3000'));
