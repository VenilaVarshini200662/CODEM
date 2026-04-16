module.exports = function (req,res,next){
    const token = req.headers['x-auth'];
    console.log(`Auth attempt: ${token}`);
    if(!token){
        return res.status(401).json({
            error:"Unauthorized access - Token missing"
        });
    }
    if(token !== "secret321"){
        return res.status(403).json({
            error: "Forbidden - Invalid token"
        });
    }
    next();
};
