require("dotenv").config()
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose")
const encryption=require("mongoose-encryption");
const md5=require("md5");

const app=express();
const port=4000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://AjithKumar_3020:124003020@cluster0.4xokems.mongodb.net/todoDb",{useNewUrlParser:true});


const todoSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
});

const todolistSchema=new mongoose.Schema({
    username:String,
    email:String,
    list:[{text:String,checked:Boolean}]
});



const userEntry=mongoose.model("userentry",todoSchema,"userentry");
const todoList=mongoose.model("todolist",todolistSchema,"todolist");

app.get("/",function(req,res){
    res.send("<h1>Welcome Ajith Kumar</h1>");
});

app.get("/todo",function(req,res){
    const {authorization}=req.headers;
    const [beforespace,afterspace]=authorization.split(" ");
    const [email,password]=afterspace.split(":");

    

    todoList.findOne({email:email})
    .then(function(user){
        res.json(user);
    })
    .catch(function(err){
        console.log(err);
    })
});

app.post("/todo",function(req,res){
    const {authorization}=req.headers;
    const {textcontent}=req.body;

    todoList.updateOne({email:authorization},{$push:{list:{text:textcontent,checked:false}}})
    .then(function(user){
        res.send("Done");
    })
    .catch(function(err){
        res.send(err);
    });
    
});


app.post("/todochecked",function(req,res){
    const localCollection=req.body;
    const {authorization}=req.headers;
    
    console.log(authorization);
    console.log(localCollection);

    todoList.updateOne({email:authorization},{$set:{list:localCollection}})
    .then(function(user){
        res.send("Done");
    })
    .catch(function(err){
        res.send(err);
    });
    
});


app.post("/todoclicked",function(req,res){
    const localCollection=req.body;
    const {authorization}=req.headers;
    
    console.log(authorization);
    console.log(localCollection);

    todoList.updateOne({email:authorization},{$set:{list:localCollection}})
    .then(function(user){
        res.send("Done");
    })
    .catch(function(err){
        res.send(err);
    });
    
});

app.post("/signin",function(req,res){
    const {username,password,email}=req.body;

    userEntry.findOne({email:email})
    .then(async function(user){
        if(user===null){
            const User=new userEntry({
                name:username,
                email:email,
                password:md5(password)
            });
            
            await User.save();

            const Content=new todoList({
                username:username,
                email:email,
                list:[]
            });

            await Content.save();

            res.send("done");
        }
        else{
            res.status(400).send("error");
        }
    })
    .catch(function(err){
        res.send(err);
    });    
});


app.post("/login",function(req,res){
    const {email,password}=req.body;

    userEntry.findOne({email:email})
    .then(function(user){
        if(user===null || user.password!=md5(password)){
            res.status(400).send("error");
        }
        else{
            res.send("done");
        }
    })
    .catch(function(err){
        res.send(err);
    });    
});


db=mongoose.connection;

db.once("open",()=>{
    app.listen(port,function(){
        console.log("Server is started");
    })
})
.on("error",function(){
    console.log("Error Happend in opening Database");
});