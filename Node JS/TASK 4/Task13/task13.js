const express = require('express');
const app = express();
app.use(express.json());
app.get('/',(req,res) =>{
    res.status(200).json({
        message:"Server is running"
    });
});
app.get('/data',(req,res,next) =>{
    try{
        res.status(200).json({
            message:"Data fetched successfully"
        });
    } 
    catch(error){
        next(error);
    }
});
app.get('/error',(req,res,next) =>{
    const err = new Error("Something went wrong");
    err.status = 500;
    next(err);
});
app.post('/users',(req,res,next) =>{
    try{
        const {name,email} = req.body;
        if (!name || !email) {
            const err = new Error("Name and email are required");
            err.status = 400;
            throw err;
        }
        res.status(201).json({
            message:"User created successfully",
            data: {name,email }
        });
    } 
    catch(error){
        next(error);
    }
});
app.use((req,res,next) =>{
    const err = new Error("Route not found");
    err.status = 404;
    next(err);
});
app.use((err,req,res,next) =>{
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({
        error:err.message || "Something went wrong",
        status:err.status || 500
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
