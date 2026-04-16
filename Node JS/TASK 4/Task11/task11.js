const express = require('express');
const app = express();
const VALID_TOKEN ="secret123";
function authMiddleware(req,res,next){
    const token = req.headers['x-auth'];
    console.log(`Auth attempt - Token: ${token}`);
    if(!token){
        return res.status(401).json({
            message:"Unauthorized access -Token missing"
        });
    }
    if(token !== VALID_TOKEN){
        return res.status(403).json({
            message:"Forbidden-Invalid token"
        });
    }
    next();
}
app.get('/',(req,res) =>{
    res.status(200).json({
        message:"Public route accessible"
    });
});
app.get('/dashboard',authMiddleware,(req,res) => {
    res.status(200).json({
        message: "Welcome to dashboard"
    });
});

app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
