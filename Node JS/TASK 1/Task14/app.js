const fs= require('fs');
const createGreeting = require('./greeting');
fs.readFile('names.txt','utf8',(err,data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const names = data.split('\n');
    let greetings = "";
    for(let i= 0; i < names.length; i++){
        const name= names[i].trim();
        if(name){
            greetings += createGreeting(name) + '\n';
        }
    }
    fs.writeFile('greetings.txt',greetings, (err) => {
        if(err){
            console.log("Error writing file");
            return;
        }
        console.log("Greetings saved successfully");
    });
});
