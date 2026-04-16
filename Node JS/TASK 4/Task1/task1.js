const express = require('express');
const app = express();
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});
app.get('/' ,(req,res)=>{
    res.json({
        message: "Welcome to learn Express"
    });
});

app.get('/status' , (req,res)=>{
    res.json({
        message:"Server is running",
        status:"OK"
    });
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
