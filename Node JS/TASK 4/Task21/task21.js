const express = require('express');
const app = express();
app.use(express.json());
const products = [
    {id: 101,name: "Laptop"},
    {id: 102,name: "Phone"},
    {id: 103,name: "Shoes"}
];
let orders = [
    {id: 5001,product:"Laptop",quantity: 1},
    {id: 5002,product:"Phone",quantity: 2}
];
function validateOrder(order){
    return (typeof order.product === "string" && order.product.trim() !== "" && typeof order.quantity === "number" && order.quantity > 0);
}
app.get('/orders',(req,res) =>{
    console.log("GET /orders");
    res.status(200).json({
        totalOrders: orders.length,
        orders: orders
    });
});
app.post('/orders',(req,res) =>{
    const {product,quantity} = req.body;
    console.log(`POST /orders - Product: ${product}, Quantity: ${quantity}`);
    if(!validateOrder(req.body)){
        return res.status(400).json({
            error:"Invalid order data. Product must be a non-empty string and quantity must be a positive number"
        });
    }
    const productExists = products.find(p => p.name.toLowerCase() === product.toLowerCase());
    if(!productExists){
        return res.status(404).json({
            error: "Product not found"
        });
    }
    const newId = orders.length ? orders[orders.length - 1].id + 1 : 5001;
    const newOrder = {id: newId,product,quantity};
    orders.push(newOrder);
    res.status(201).json({
        message: "Order created successfully",
        order: newOrder
    });
});

app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
