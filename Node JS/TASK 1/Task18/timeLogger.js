const fs= require('fs');
function logTime(message) {
    const now= new Date();
    const formattedTime =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, '0') + "-" +
        String(now.getDate()).padStart(2, '0') + " " +
        String(now.getHours()).padStart(2, '0') + ":" +
        String(now.getMinutes()).padStart(2, '0') + ":" +
        String(now.getSeconds()).padStart(2, '0');
    const log = formattedTime + " - " + message + "\n";
    fs.appendFile('timeLog.txt', log,(err) => {
        if(err){
            console.log("Error writing log");
            return;
        }
        console.log("Logged:", message);
    });
}
module.exports= logTime;