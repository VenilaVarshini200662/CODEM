const fs= require('fs');
fs.readFile('text.txt','utf8',(err, data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const words= data.split(' ');
    const uniqueWords = new Set(words);
    const result = Array.from(uniqueWords).join('\n');
    fs.writeFile('uniqueWords.txt', result,(err) => {
        if(err){
            console.log("Error writing file");
            return;
        }
        console.log("Unique words saved successfully");
    });
});
