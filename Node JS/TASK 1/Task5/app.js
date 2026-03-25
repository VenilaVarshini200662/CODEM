const fs = require('fs');
fs.readFile('message.txt','utf8', (err, data) => {
    if (err){
        console.log("Error reading file");
        return;
    }
    const upperText= data.toUpperCase();
    fs.writeFile('uppercase.txt', upperText, (err) => {
        if (err){
            console.log("Error writing file");
            return;
        }
        console.log("File converted successfully");
    });
});
