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

app.listen(3000,() => console.log("3000 port listen !"));