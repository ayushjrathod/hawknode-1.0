const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

const homeContent="printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions."
const aboutContent="its about application not just about knowledge."
const contactContent ="hey click here to connect"

const posts = [];


//MongoDB Connection
mongoose.connect("mongodb+srv://clashofa1057:temppass@cluster0.fqzvj3u.mongodb.net/blogSite?retryWrites=true&w=majority")
    .then(()=>{
        console.log("mongodb connection successfull");
    })
    .catch((err)=>{
        console.log(err);
    });

const postSchema =new mongoose.Schema({
    Title:String,
    Body:String
});

const Post = mongoose.model("Post",postSchema);

//Handelling Requests

app.get("/",function(req,res){
    Post.find({})
        .then((foundPosts)=>{
            if(foundPosts === 0){
                res.render("home",{Title:"No Posts Found"});
            }else{
                res.render("home",{posts:foundPosts});
            }
        })
        .catch((err)=>{
            console.log(err);
        });
});

app.get("/about",function(req,res){
    res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res){
    res.render("contact",{contactContent:contactContent})
});

app.route("/compose")
    .get((req,res)=>{
        res.render("compose");
    })
    .post((req,res)=>{
        Post.insertMany([
            {
                Title:req.body.titleBody,
                Body:req.body.postBody
            }
        ]);
        post.save()
            .then(()=>{
               res.redirect("/"); 
            }); 
    });


app.get("/posts/:postId",function(req,res){
    const requestedPostId=req.params.postId;

        Post.find({_id:requestedPostId})
            .then((post)=>{
                res.render("post",{
                 Title:post.Title,
                 Body:post.Body
             });
            })
            .catch((err)=>{
                console.log(err);
            });
    });


app.listen("3000",function(){
    console.log("The server started on port 3000.");
});