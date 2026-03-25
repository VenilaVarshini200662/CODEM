const fs= require('fs');
const saveStudent = require('./studentWriter');
fs.writeFile('students.txt', '', (err) => {
    if(err){
        console.log("Error clearing file");
        return;
    }
    saveStudent("John", 20);
    saveStudent("Sara", 22);
    setTimeout(() => {
        fs.readFile('students.txt','utf8',(err, data) => {
            if (err) {
                console.log("Error reading file");
                return;
            }
            console.log("\nStudent List:");
            console.log(data);
        });
    }, 500);
});
