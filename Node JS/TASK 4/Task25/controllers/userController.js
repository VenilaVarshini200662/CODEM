let users = [
    {id: 1,name: "Venila",email: "venila@mail.com"}
];
exports.getUsers = (req,res) => {
    console.log("Fetching users");
    res.status(200).json({
        success: true,
        data: users
    });
};
exports.createUser= (req,res) => {
    const {name,email} = req.body;
    if(!name || !email){
        return res.status(400).json({
            success: false,
            message:"Name and email are required"
        });
    }
    const newUser = {id: users.length + 1,name,email};
    users.push(newUser);
    res.status(201).json({
        success: true,
        message: "User created",
        data: newUser
    });
};
