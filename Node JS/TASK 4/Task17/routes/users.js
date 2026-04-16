const express = require('express');
const router = express.Router();
let users = [
    {id: 1,name: "Sai",email: "sai@mail.com"},
    {id: 2,name: "Venila",email: "venila@mail.com"}
];
router.use((req,res,next) =>{
    console.log(`User Route Accessed: ${req.method} ${req.url}`);
    next();
});
router.get('/',(req,res) =>{
    res.status(200).json({
        message:"User routes working",
        users: users
    });
});
router.post('/',(req,res) =>{
    const {name,email} = req.body;
    if(!name || !email){
        return res.status(400).json({
            error: "Name and email are required"
        });
    }
    const newUser = {id: users.length + 1,name, email};
    users.push(newUser);
    res.status(201).json({
        message:"User created successfully",
        user: newUser
    });
});
module.exports = router;
