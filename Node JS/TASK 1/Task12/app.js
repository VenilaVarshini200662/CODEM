const fs = require('fs');
fs.readFile('sentence.txt','utf8',(err, data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const reversed= data.split('').reverse().join('');
    fs.writeFile('reverse.txt', reversed,(err) => {
        if(err){
            console.log("Error writing file");
            return;
        }
        console.log("File reversed successfully");
    });
});
