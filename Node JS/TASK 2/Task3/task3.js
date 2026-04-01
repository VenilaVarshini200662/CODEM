const fs = require('fs');
let timeout;
function readFile(filename){
    console.log('Reading file...');
    return new Promise((resolve, reject) =>{
        fs.readFile(filename,'utf-8',(err, data) =>{
            if(err)
                reject(err);
            else 
                resolve(data);
        });
    });
}
function parseContent(content){
    const lines= content.split('\n');
    const totalLines= lines.length;
    const filtered= lines.filter(line => line.trim() !== '');
    const removed =totalLines - filtered.length;
    console.log(`Parsing ${totalLines} lines, ${removed} empty removed`);
    return filtered;
}

function saveProcessed(lines){
    return new Promise((resolve, reject) =>{
        fs.writeFile('output.txt',lines.join('\n'), (err) =>{
            if(err)
                 reject(err);
            else{
                console.log('Saved to output.txt');
                resolve();
            }
        });
    });
}

function watchAndProcess(filename){
    fs.watch(filename,(eventType) =>{
        if(eventType === 'change'){
            clearTimeout(timeout);
            timeout= setTimeout(() =>{
                console.log(`File changed: ${filename}`);
                readFile(filename)
                    .then(parseContent)
                    .then(saveProcessed)
                    .catch(err => console.log('Error:', err));
            }, 100); 
        }
    });
}
watchAndProcess('data.txt');
console.log('Watching file data.txt...');
