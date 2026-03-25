const fs = require('fs');
fs.readFile('numbers.txt','utf8',(err, data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const numbers= data.split('\n');
    const evenNumbers = [];
    for(let i= 0; i< numbers.length; i++){
        const num = parseInt(numbers[i]);
        if(num % 2 === 0){
            evenNumbers.push(num);
        }
    }
    const result = evenNumbers.join('\n');
    fs.writeFile('evenNumbers.txt', result, (err) => {
        if(err){
            console.log("Error writing file");
            return;
        }
        console.log("Even numbers saved successfully");
    });
});
