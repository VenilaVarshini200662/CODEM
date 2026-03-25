const fs = require('fs');
const fileName = 'data.txt';
fs.stat(fileName,(err, stats) => {
    if(err){
        console.log("Error: File not found");
        return;
    }
    console.log("File:", fileName, ", Size:", stats.size, "bytes");
});
