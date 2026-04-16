const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');
app.use(express.json());
app.use('/admin',adminRoutes);
app.use('/users',userRoutes);
app.listen(3000,() =>{
    console.log("Server is running on port 3000");
});
