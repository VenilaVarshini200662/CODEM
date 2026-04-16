const express = require('express');
const app = express();
app.use(express.json());
function validateUser(req,res,next){
    if(!req.body){
        console.log("Validation Failed-No request body");
        return res.status(400).json({
            error:"Request body is required",
            status:"Validation Failed"
        });
    }

    const {name,email} = req.body;
    if(!name || !email){
        console.log("Validation Failed - Missing name or email");
        return res.status(400).json({
            error:"Name and email are required",
            status: "Validation Failed"
        });
    }
    next();
}
app.post('/users',validateUser,(req,res) =>{
    const {name,email} = req.body;
    res.status(201).json({
        message: "User created successfully",
        data: {name,email},
        validation: "Success"
    });
});
app.post('/register',validateUser, (req,res) => {
    res.status(201).json({
        message:"Registration successful",
        data: req.body,
        validation: "Success"
    });
});
app.get('/', (req,res) =>{
    res.status(200).json({
        message: "Server is running"
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
