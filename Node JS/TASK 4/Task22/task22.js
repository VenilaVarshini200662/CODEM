const express= require('express');
const app= express();
app.use(express.json());
function authMiddleware(req,res,next){
    const token = req.headers['x-auth'];
    console.log(`Auth attempt: ${token}`);
    if(!token){
        return res.status(401).json({
            error: "Unauthorized - Token missing"
        });
    }
    if(token !== "admin123"){
        return res.status(401).json({
            error: "Unauthorized - Invalid token"
        });
    }
    next();
}
app.get('/',(req,res) =>{
    res.json({
        message: "Public route working"
    });
});
app.get('/admin',authMiddleware,(req,res) =>{
    console.log("Admin route accessed");
    res.status(200).json({
        message: "Welcome Admin"
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
