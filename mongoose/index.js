const {default:mongoose,mongo} = require("mongoose")
const express = require('express')
var bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://tu7dkjdue:salam123@cluster0.0qjw6ty.mongodb.net/FirstApp').then(res=>{
    console.log('succes');
}).catch(err=>{
    console.log(err);
})

const { Schema } = mongoose;
const postSchema = new Schema({
    title:String,
    body:String,
    likeCount:Number
})

const Post = mongoose.model('Post',postSchema)
app.get('/',(req,res)=>{
    res.send("Hello World")
})
//CreatePost
app.post('/api/posts',function(req,res){
    let title=req.body.title
    let body=req.body.body
    let likeCount = req.body.likeCount

    let post = new Post({
        title:title,
        body:body,
        likeCount:likeCount
    })
     post.save().then(res=>{
        console.log(res);
     }).catch((reason)=>{
        console.log(reason);
     })
   
    res.status(201).json(post)

})
//GetAllPost
app.get('/api/posts',(req,res)=>{
    Post.find()
    .then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})
//GetById
app.get('/api/posts/:id',(req,res)=>{
    let id = req.params.id
    Post.findById(id)
    .then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})
//DeletePost
app.delete('/api/posts/:id',(req,res)=>{
    let id = req.params.id
    Post.findByIdAndRemove(id).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json(err)
    })
})
//UpdatePost
app.put('/api/posts/:id',(req,res)=>{
    let id =req.params.id
    existedid = Post.find(id)
    if (existedid) {
            existedid.title = req.body.title
            existedid.body = req.body.body
            existedid.likeCount = req.body.likeCount
            res.send(existedid)
    }else{
        res.status(500).json({"message":"404 Not found" })
    }
})

app.listen(3001)