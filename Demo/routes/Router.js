const express = require("express");
const router = express.Router();
const app = express();
const fs = require("fs");
const path = require("path");
let folder_path = path.join("routes","Myfile.json"); 
let temp;

router.get("/", (req,res) => {
    fs.readFile(folder_path,"utf-8",(err,file) => {
        res.send(JSON.parse(file));
    })
})

router.get("/:id", (req,res) => {
    fs.readFile(folder_path,"utf-8",(err,file) => {
        const obj = JSON.parse(file);
        temp = req.params.id;
        let ide = obj.findIndex(v => (v.id == temp))
        //console.log(obj[req.params.id-1]);
        //let result = obj[req.params.id-1];
        res.send(obj[ide]);
    })
})

router.post("/", (req,res) => {
    fs.readFile(folder_path,"utf-8",(err,file) => {
        const obj = JSON.parse(file);
        obj.push(req.body);
        fs.writeFile(folder_path, JSON.stringify(obj,null,5), "utf-8", (err) => {
            res.send(obj);
            console.log("POST");
        })
     })
})

router.put("/:id", (req,res) => {
    fs.readFile(folder_path, "utf-8", (err,file) => {
        const obj = JSON.parse(file);
        temp = req.params.id;
        let ide = obj.findIndex(v => (v.id == temp))
        obj[ide] = req.body;
            fs.writeFile(folder_path, JSON.stringify(obj,null,5), "utf-8", (err) => {
                res.send(obj);
                console.log("put");
            })
    })
})

router.delete("/:id", (req,res) => {
    fs.readFile(folder_path, "utf-8", (err,file) => {
        const obj = JSON.parse(file);
        temp = req.params.id;
        let ide = obj.findIndex(v => (v.id == temp))
        obj.splice(ide,1);
        fs.writeFile(folder_path, JSON.stringify(obj,null,5), "utf-8", (err) => {
            res.send(obj);
            console.log("delete");
        } )
    })
})
module.exports = router;


