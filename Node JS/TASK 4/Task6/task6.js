const express = require('express');
const app = express();
app.use((req,res,next)=>{
    const startTime = new Date().toISOString();
    res.on('finish',()=>{
        console.log(`Request: ${req.method} ${req.url} ${res.statusCode} ${startTime}`);
    });
    next();
});

app.get('/',(req,res)=>{
    res.status(200).json({
        message:"Welcome to home page"
    });
});

app.get('/about',(req,res)=>{
    res.status(200).json({
        message:"Welcome to about page"
    });
});

app.get('/contact',(req,res)=>{
    res.status(200).json({
        message:"Welcome to contact page"
    });
});

app.get('/api/products' , (req,res)=>{
    res.status(200).json({
        message:"Products are loading"
    });
});

app.use((req,res)=>{
    res.status(404).json({
        error:"Page not found",
        statusCode: 404
    });
});
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
