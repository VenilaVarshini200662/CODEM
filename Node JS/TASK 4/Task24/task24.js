const express = require('express');
const app = express();
app.use(express.json());
const logger =require('./middleware/logger');
app.use(logger);
const userRoutes = require('./routes/users');
app.use('/api/users',userRoutes);
app.get('/',(req,res) =>{
    res.json({
        message: "Application running successfully"
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
