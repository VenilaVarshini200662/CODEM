const express = require('express');
const app = express();
const products = [
    {id:101, name:"Laptop", price:50000, category:"Electronics"},
    {id:102, name:"Shirt", price:1500, category:"Clothing"},
    {id:103, name:"Phone", price:30000, category:"Electronics"},
    {id:104, name:"Shoes", price:2500, category:"Footwear"},
    {id:105, name:"Watch", price:4000, category:"Accessories"}
];

app.get('/search' , (req,res)=>{
    const {name ,category} = req.query;
    console.log(`Search query: Name = ${name} ,Category = ${category}`);
    if(!name && !category){
        return res.status(400).json({
            error:"Provide atleast any one parameter(name or category)"
        });
    }

    let filteredProducts = products;
    if(name)
        filteredProducts=filteredProducts.filter(product=> product.name.toLowerCase().includes(name.toLowerCase()));
    if(category)
        filteredProducts= filteredProducts.filter(product => category.toLowerCase() === product.category.toLowerCase());

    res.status(200).json({
        resultCount: filteredProducts.length,
        results: filteredProducts
    });
});
app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
