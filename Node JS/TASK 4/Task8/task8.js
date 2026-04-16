const express = require('express');
const app = express();
const users = [
    {username:"sai",email:"sai@mail.com",role:"student"},
    {username:"Venila",email:"venila@mail.com",role:"developer"},
    {username:"Varshini",email:"varshini@mail.com",role:"trainer"},
    {username:"Lija", email:"lija@mail.com", role:"student"},
];

app.get('/users/:username',(req, res) =>{
    const uname =req.params.username.toLowerCase();
    const requestTime = new Date().toISOString();
    console.log(`Requested username: ${uname}`);
    if(!/^[a-zA-Z]+$/.test(uname)){
        return res.status(400).json({
            error:" Invalid username format"
        });
    }
    const userDetail = users.find(user => user.username.toLowerCase() === uname);
    if(!userDetail){
        return res.status(404).json({
            error:"Name not found"
        });
    }

    res.status(200).json({
        ... userDetail,
        requestTime: requestTime 
    });
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
