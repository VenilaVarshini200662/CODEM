module.exports = (req,res,next) => {
    const token = req.headers['x-auth'];
    console.log(`Auth attempt: ${token}`);
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Token missing"
        });
    }
    if(token !== "secret123"){
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token"
        });
    }
    next();
};
