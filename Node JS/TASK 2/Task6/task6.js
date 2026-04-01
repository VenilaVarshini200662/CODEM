const EventEmitter =require('events');
const fs = require('fs');
const emitter =new EventEmitter();
emitter.on('dataReceived', async (data) =>{
    console.log('dataReceived →', data);
    if(data && data.value > 0){
        emitter.emit('dataValid', data);
    }else{
        emitter.emit('dataInvalid', data);
    }
});
emitter.on('dataValid',async(data) =>{
    console.log('dataValid  → validation passed');
    const processedData ={
        id: data.id,
        value: data.value * 2
    };
    emitter.emit('dataProcessed', processedData);
});
emitter.on('dataProcessed', async(data) =>{
    console.log('dataProcessed →', data);
    fs.writeFile('result.txt', JSON.stringify(data), (err) =>{
        if(err){
            console.log('Error saving file');
            return;
        }
        console.log('dataSaved   → written to result.txt');
        emitter.emit('dataSaved');
    });
});
emitter.on('dataInvalid', (data) =>{
    console.log('dataInvalid   → invalid data');
});
emitter.emit('dataReceived',{ id: 1, value: 42 });
