const express = require('express');
const app = express();
const userRoutes= require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);
app.get('/',(req,res) =>{
    res.json({message: "Main server running"});
});

app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
