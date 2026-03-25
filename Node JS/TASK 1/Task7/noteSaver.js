const fs = require('fs');
function saveNote(noteText) {
    fs.appendFile('notes.txt', noteText + '\n', (err) => {
        if(err){
            console.log("Error saving note");
            return;
        }
        console.log("Note saved:", noteText);
    });
}
module.exports = saveNote;