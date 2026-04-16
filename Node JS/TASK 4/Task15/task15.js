const express = require('express');
const app = express();
app.use(express.json());
let products = [
    {id:101, name:"Laptop", price:50000, category:"Electronics"},
    {id:102, name:"Shirt", price:1500, category:"Clothing"}
];
function validateProduct(product){
    return(product.name && typeof product.price === "number" && product.category
    );
}
app.get('/products',(req,res) => {
    console.log("GET /products");
    res.status(200).json({
        totalProducts: products.length,
        products: products
    });
});

app.post('/products',(req,res) => {
    console.log("POST /products");
    const {id,name,price,category} = req.body;
    if(!validateProduct(req.body) || !id){
        return res.status(400).json({
            error: "id, name, price(number), and category are required"
        });
    }
    const exists = products.find(p => p.id === id);
    if(exists){
        return res.status(400).json({
            error: "Product ID must be unique"
        });
    }
    const newProduct = {id,name,price,category };
    products.push(newProduct);
    res.status(201).json({
        message:"Product created successfully",
        product:newProduct
    });
});
app.put('/products/:id', (req,res) => {
    const id = parseInt(req.params.id);
    console.log(`PUT /products/${id}`);
    const {name,price,category} = req.body;
    if(!validateProduct(req.body)){
        return res.status(400).json({
            error: "name, price(number), and category are required"
        });
    }
    const product = products.find(p => p.id === id);
    if(!product){
        return res.status(404).json({
            error: "Product not found"
        });
    }
    product.name = name;
    product.price = price;
    product.category = category;
    res.status(200).json({
        message: "Product updated successfully",
        product: product
    });
});
app.delete('/products/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    console.log(`DELETE /products/${id}`);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({
            error: "Product not found"
        });
    }
    const deleted = products.splice(index,1);
    res.status(200).json({
        message:"Product deleted successfully",
        product:deleted[0]
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
