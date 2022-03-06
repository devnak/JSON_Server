const express = require("express");
const app = express();
const fs = require("fs");
const router = require("./routes/Router");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/data", router);

app.get("/",(req,res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/ssr",(req,res) =>{
    fs.readFile('./template.html','utf-8',  (err,result) => {
        fs.readFile("./routes/Myfile.json",'utf-8',(err,json) => {
            res.send(result.replace("REPLACE",json));
        })
    })
})
app.listen(3000,() => console.log("3000 port listen !"));