const express= require('express');
const router= express.Router();
const userController = require('../controllers/userController');
router.use((req,res,next) =>{
    console.log(`Route: ${req.method} ${req.url}`);
    next();
});
router.get('/',userController.getUsers);
router.post('/',userController.createUser);
module.exports= router;
