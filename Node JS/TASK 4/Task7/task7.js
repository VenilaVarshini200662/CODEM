const express = require('express');
const app =express();
const products = [
    {id:101, name:"Laptop", price:50000, category:"Electronics"},
    {id:102, name:"Shirt", price:1500, category:"Clothing"},
    {id:103, name:"Phone", price:30000, category:"Electronics"},
    {id:104, name:"Shoes", price:2500, category:"Footwear"},
    {id:105, name:"Watch", price:4000, category:"Accessories"}
];

app.get('/products/:id',(req,res)=>{
    const startTime = new Date().toISOString();
    const id = parseInt(req.params.id);
    console.log(`Requested product id: ${id}`);
    if(isNaN(id)){
        return res.status(400).json({
           error: "Invalid product id format"  
        });
    }
    const product = products.find(p => p.id === id);
    if(!product){
        return res.status(404).json({
            error: "Product not found"
        });
    }
    res.status(200).json({
        RequestedTime: startTime,
        ...product
    });
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
