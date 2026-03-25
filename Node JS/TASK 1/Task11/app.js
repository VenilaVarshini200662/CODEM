const fs = require('fs');
const generateNumber = require('./randomNumber');
fs.writeFile('randomNumbers.txt', '',(err) => {
    if(err){
        console.log("Error clearing file");
        return;
    }
    for(let i= 0; i < 5; i++){
        const num= generateNumber();
        fs.appendFile('randomNumbers.txt', num + '\n', (err) => {
            if(err){
                console.log("Error writing number");
            }
        });
    }
    console.log("Random numbers generated and saved!");
});
