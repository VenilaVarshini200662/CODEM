const fs = require('fs');
fs.readFile('users.txt','utf8', (err, data) => {
    if(err) {
        console.log("Error reading file");
        return;
    }
    const users= data.split('\n');
    console.log("User List");
    for(let i = 0; i < users.length; i++) {
        console.log((i + 1) + ". " + users[i]);
    }
});
