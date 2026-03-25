const fs= require('fs');
fs.readFile('paragraph.txt', 'utf8', (err, data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const words= data.split(' ');
    const wordCount = words.length;
    console.log("Total Words:", wordCount);
});
