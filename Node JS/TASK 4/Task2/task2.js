const express = require('express');
const app = express();
app.use((req,res,next)=>{
    console.log(`Route accessed: ${req.url}`);
    next();
});
app.get('/home' , (req,res)=>{
    res.status(200).json({
        route:"home", message:"Welcome to home page", timestamp: new Date()   
    });
});
app.get('/about',(req,res)=>{
    res.status(200).json({
        route:"about", message:"Welcome to about page", timestamp: new Date()
    });
});
app.get('/contact',(req,res)=>{
    res.status(200).json({
        route:"contact", message:"Welcome to contact page", timestamp:new Date()
    });
});
app.use((req,res)=>{
    res.status(404).json({
        error:"Route not found", status:404
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
