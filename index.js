const express =require("express");  
const mongoose =require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost:27017/testDB")
//127.0.0.1

//con checking
const db =mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("connected to db");
})
//schema crtn
const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

//model
const userModel =new mongoose.Schema("user",userSchema)



app.get("/",(req,res)=>{
    const user =new userModel ({
        name:"sai",
        email:"sai@gmail.com",
        password:"12345"
    })
    user.save()
    res.send("hello");
})
app.listen(3000,()=>{
    console.log("server running");
})

