const fs = require('fs');
fs.readdir('assets',(err, files) => {
    if(err){
        console.log("Error reading directory");
        return;
    }
    const result = files.join('\n');
    fs.writeFile('fileList.txt', result,(err) => {
        if (err) {
            console.log("Error writing file");
            return;
        }
        console.log("File list saved successfully");
    });
});
