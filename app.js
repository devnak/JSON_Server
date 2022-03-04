const express = require("express");
const app = express();
const fs = require("fs");
let temp;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/", (req,res) => {
    fs.readFile("Myfile.json","utf-8",(err,file) => {
        res.send(JSON.parse(file));
    })
})

app.get("/:id", (req,res) => {
    fs.readFile("Myfile.json","utf-8",(err,file) => {
        const obj = JSON.parse(file);
        console.log(obj[req.params.id-1]);
        let result = obj[req.params.id-1];
        res.send(result);
    })
})

app.post("/", (req,res) => {
    fs.readFile("Myfile.json","utf-8",(err,file) => {
        const obj = JSON.parse(file);
        obj.push(req.body);
        fs.writeFile("Myfile.json", JSON.stringify(obj,null,5), "utf-8", (err) => {
            res.send(obj);
            console.log("POST");
        })
     })
})

app.put("/:id", (req,res) => {
    fs.readFile("Myfile.json", "utf-8", (err,file) => {
        const obj = JSON.parse(file);
        temp = req.params.id;
        let id = obj.findIndex(v => (v.id == temp))
        obj[id] = req.body;
            fs.writeFile("Myfile.json", JSON.stringify(obj,null,5), "utf-8", (err) => {
                res.send(obj);
                console.log("put");
            })
    })
})

app.delete("/:id", (req,res) => {
    fs.readFile("Myfile.json", "utf-8", (err,file) => {
        const obj = JSON.parse(file);
        temp = req.params.id;
        let id = obj.findIndex(v => (v.id == temp))
        obj.splice(id,1);
        fs.writeFile("Myfile.json", JSON.stringify(obj,null,5), "utf-8", (err) => {
            res.send(obj);
            console.log("delete");
        } )
    })
})



app.listen(3000,() => console.log("3000 port listen !"));