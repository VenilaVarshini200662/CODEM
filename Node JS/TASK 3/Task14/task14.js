const { Readable } = require('stream');
const myStream= new Readable({
    read() {}  
});
myStream.push('Line 1: Hello');
myStream.push('Line 2: World');
myStream.push('Line 3: Done');
myStream.push(null);
myStream.on('data',(chunk) => {
    console.log('Chunk received:',chunk.toString());
});
myStream.on('end',() => {
    console.log('Stream ended');
});
