const fs = require('fs');
fs.readFile('story.txt','utf8',(err, data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const lines= data.split('\n');
    const lineCount= lines.length;
    console.log("Total Lines:", lineCount);
});
