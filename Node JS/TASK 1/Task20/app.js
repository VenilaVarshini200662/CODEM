const fs= require('fs');
fs.readFile('products.json','utf8',(err, data) => {
    if(err){
        console.log("Error reading file");
        return;
    }
    const products = JSON.parse(data);
    console.log("Product List");
    for(let i= 0; i< products.length; i++){
        console.log(products[i].name + " - $" + products[i].price);
    }
});
