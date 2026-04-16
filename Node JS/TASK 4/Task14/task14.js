const express = require('express');
const app = express();
app.use(express.json());
let users = [
    {id: 1,name:"Sai",email:"sai@mail.com"},
    {id: 2,name:"Venila",email:"venila@mail.com"}
];
function validateUser(data){
    return data.name && data.email;
}
app.get('/users',(req,res) =>{
    console.log("GET /users");
    res.status(200).json({
        totalUsers: users.length,
        users: users
    });
});
app.post('/users',(req,res) =>{
    console.log("POST /users");
    const {name,email} = req.body;
    if(!validateUser(req.body)){
        return res.status(400).json({
            error: "Name and email are required"
        });
    }
    const newUser = {
        id: users.length + 1,name,email
    };
    users.push(newUser);
    res.status(201).json({
        message: "User created successfully",
        user:newUser
    });
});
app.put('/users/:id',(req,res) => {
    console.log(`PUT /users/${req.params.id}`);
    const id = parseInt(req.params.id);
    const {name,email} = req.body;
    if(!validateUser(req.body)){
        return res.status(400).json({
            error: "Name and email are required"
        });
    }
    const user = users.find(u => u.id === id);
    if(!user){
        return res.status(404).json({
            error: "User not found"
        });
    }
    user.name = name;
    user.email = email;
    res.status(200).json({
        message: "User updated successfully",
        user: user
    });
});
app.delete('/users/:id',(req,res) =>{
    console.log(`DELETE /users/${req.params.id}`);
    const id = parseInt(req.params.id);
    const userIndex= users.findIndex(u => u.id === id);
    if(userIndex === -1){
        return res.status(404).json({
            error: "User not found"
        });
    }
    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json({
        message:"User deleted successfully",
        user: deletedUser[0]
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
