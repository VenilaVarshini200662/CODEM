let users = [
    {id: 1,name:"Sai",email: "sai@mail.com"},
    {id: 2,name:"Venila",email: "venila@mail.com"}
];
exports.getUsers = (req,res) => {
    console.log("Controller: Fetch users");
    res.status(200).json({
        message: "Users fetched successfully",
        users: users
    });
};
exports.createUser = (req,res) => {
    console.log("Controller: Create user");
    const {name,email} = req.body;
    if(!name || !email){
        return res.status(400).json({
            error: "Name and email are required"
        });
    }
    const newUser = {id: users.length + 1,name,email};
    users.push(newUser);
    res.status(201).json({
        message:"User created successfully",
        user: newUser
    });
};
