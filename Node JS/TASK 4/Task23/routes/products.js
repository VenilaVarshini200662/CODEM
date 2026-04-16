const express = require('express');
const app = express();
app.use(express.json());
const productRoutes = require('./routes/products');
app.use('/products',productRoutes);
app.get('/',(req,res) =>{
    res.json({ message: "Home route"});
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
