const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./middleware/logger');
app.use(logger);
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.get('/',(req,res) =>{
    res.json({
        success: true,
        message: "API running successfully"
    });
});
app.use((req,res) =>{
    res.status(404).json({
        success: false,
        message:"Route not found"
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
