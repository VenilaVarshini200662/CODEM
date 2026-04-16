const express = require('express');
const app = express();
const Students = [
    { id:1, name:"Sai", course:"CSE", age:21},
    { id:2,name:"Venila", course:"CSE", age:20},
    { id:3, name:"Rahul", course:"IT", age:22},
    { id:4, name:"Anu", course:"EEE", age:21},
    { id:5, name:"Kiran", course:"CSE", age:23}
];

function isValidStudent(student){
    return (typeof student.id === "number" && typeof student.name === "string" &&  typeof student.course === "string" && typeof student.age === "number");
}
app.use((req,res,next)=>{
    console.log(`Student request accessed: ${req.method} ${req.url}`);
    next();
});
app.get('/students', (req,res)=>{
    const valid = Students.every(isValidStudent);
    if(!valid){
        return res.status(500).json({
            error:" Invalid student details"
        });
    }
    res.status(200).json(Students);
});
app.get('/students/count' , (req,res)=>{
    res.status(200).json({
        count: Students.length
    });
});
app.get('/students/names', (req,res)=>{
    const name = Students.map(student => student.name);
    res.status(200).json(name);
});
app.listen(3000, ()=>{
    console.log("Server running on port 3000");
});
