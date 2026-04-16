const express = require('express');
const app = express();
let items = [];
for( let i=1 ; i<=20; i++){
    items.push({id:i, name:`item${i}`});
}

app.get('/items',(req,res)=>{
    let {page=1,limit=5}=req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    console.log(`Pagination requests: Page:${page}, Limit:${limit}`);
    if(isNaN(page) || isNaN(limit) || page<=0 || limit <=0){
        return res.status(400).json({
            error:"Provide valid page number and limit number"
        });
    }
    const startIndex = (page-1)*limit;
    const endIndex =startIndex + limit;
    const pageItems = items.slice(startIndex, endIndex);
    res.status(200).json({
        page:page,
        limit:limit,
        totalItems:items.length,
        totalPages:Math.ceil((items.length/limit)),
        results: pageItems
    });
});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
