const fs = require('fs');
function logNumber(number){
    fs.appendFile('numbers.txt', number + '\n', (err) => {
        if (err){
            console.log("Error writing to file");
            return;
        }
        console.log("Number added:", number);
    });
}
module.exports =logNumber;