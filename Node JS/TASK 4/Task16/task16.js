const express = require('express');
const app = express();
app.use(express.json());
let posts = [
    {id: 1,title:"Express Basics",content:"Intro to Express",author:"Sai" },
    {id: 2,title:"Node Guide",content:"Learn Node.js",author:"Venila" }
];
function validatePost(post){
    return post.title && post.content && post.author;
}
app.get('/posts',(req,res) =>{
    console.log("GET /posts");
    res.status(200).json({
        totalPosts: posts.length,
        posts: posts
    });
});
app.post('/posts',(req,res) => {
    console.log("POST /posts");
    const {title,content,author} = req.body;
    if(!validatePost(req.body)){
        return res.status(400).json({
            error: "title, content, and author are required"
        });
    }
    const newPost = {id: posts.length + 1,title,content,author};
    posts.push(newPost);
    res.status(201).json({
        message: "Post created successfully",
        post: newPost
    });
});
app.put('/posts/:id',(req,res) => {
    const id = parseInt(req.params.id);
    console.log(`PUT /posts/${id}`);
    const {title,content,author } = req.body;
    if(!validatePost(req.body)){
        return res.status(400).json({
            error: "title, content, and author are required"
        });
    }
    const post = posts.find(p => p.id === id);
    if(!post){
        return res.status(404).json({
            error: "Post not found"
        });
    }
    post.title = title;
    post.content = content;
    post.author = author;
    res.status(200).json({
        message:"Post updated successfully",
        post:post
    });
});
app.delete('/posts/:id', (req,res) => {
    const id = parseInt(req.params.id);
    console.log(`DELETE /posts/${id}`);
    const index = posts.findIndex(p => p.id === id);
    if(index === -1){
        return res.status(404).json({
            error: "Post not found"
        });
    }
    const deletedPost = posts.splice(index, 1);
    res.status(200).json({
        message: "Post deleted successfully",
        post: deletedPost[0]
    });
});
app.listen(3000,() =>{
    console.log("Server running on port 3000");
});
