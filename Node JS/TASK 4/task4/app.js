const express = require('express');
const app  = express();
app.use((req,res,next)=>{
    console.log(`Request: ${req.method} ${req.url}`);
    next();
});
app.use(express.static('public'));
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
