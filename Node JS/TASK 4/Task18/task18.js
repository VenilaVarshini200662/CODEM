const express = require('express');
const app= express();
app.use(express.json());
const userRoutes = require('./routes/users');

app.use('/api/users',userRoutes);
app.get('/',(req,res) =>{
    res.json({message: "Server running"});
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
