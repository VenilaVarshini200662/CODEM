const fs = require('fs');
function saveStudent(name, age) {
    const data = name + " - " + age + "\n";
    fs.appendFile('students.txt', data,(err) => {
        if(err){
            console.log("Error saving student data");
            return;
        }
        console.log("Saved:", name);
    });
}
module.exports= saveStudent;