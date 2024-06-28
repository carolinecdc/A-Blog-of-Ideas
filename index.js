import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



const postArray = [];


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


app.get("/", (req, res) =>{
    
    res.render("index.ejs", {        
        array: postArray,
    });
});

app.get("/create-a-post", (req,res)=>{
    res.render("create-a-post.ejs");
});

app.post("/submit", (req, res)=>{
    let postDic = {}; 
    postDic["postTitle"] = req.body["pTitle"];
    postDic["postText"] = req.body["pText"];
    postDic["subTitle"] = req.body["subTitle"];
    postDic["userName"] = req.body["userName"];
    const date = new Date();
    var fullDate = `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}.`;
    postDic["date"] = fullDate;
    postArray.unshift(postDic);    
        
    res.render("post-preview.ejs",{         
        array: postArray,        
    });    
});


app.get(`/post/:index`, (req, res)=>{             
    res.render("post.ejs", {post: postArray[req.params.index]});
    
});

app.get("/all-posts", (req, res)=>{
    res.render("all-posts.ejs", 
        {array: postArray,
        }
    )
});

app.post("/delete", (req,res) =>{ 
    postArray.shift();   
    res.redirect("/");
});

app.post("/edit", (req, res)=>{    
    res.render("edit.ejs", {
        array: postArray,
    });
    postArray.shift();
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});