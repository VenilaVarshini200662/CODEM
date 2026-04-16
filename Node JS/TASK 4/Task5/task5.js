const express = require('express');
const app = express();
const products = [
    {id:101, name:"Laptop", price:50000, category:"Electronics"},
    {id:102, name:"Shirt", price:1500, category:"Clothing"},
    {id:103, name:"Phone", price:30000, category:"Electronics"},
    {id:104, name:"Shoes", price:2500, category:"Footwear"},
    {id:105, name:"Watch", price:4000, category:"Accessories"}
];

function isValidProduct(product){
    return (typeof product.id === "number" && typeof product.name === "string" && typeof product.price === "number" && typeof product.category === "string");
}
app.use((req,res,next)=>{
    console.log(`API request: ${req.method} ${req.url}`);
    next();
});

app.get('/api/products' ,(req,res)=>{
    const valid = products.every(isValidProduct);
    if(!valid){
        return res.status(500).json({
            error:"Invalid product"
        });
    }
    const sortedProducts = [...products].sort((a,b)=>{
        a.name.localeCompare(b.name);
    });
    res.status(200).json({
        totalProducts:products.length,
        Products: sortedProducts
    });
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
