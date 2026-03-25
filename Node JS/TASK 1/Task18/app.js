const fs = require('fs');
const logTime= require('./timeLogger');
fs.writeFile('timeLog.txt', '',(err) => {
    if(err){
        console.log("Error clearing file");
        return;
    }
    logTime("Server started");
    logTime("User logged in");
});
