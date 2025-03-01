var express = require("express");
var app = express();
app.get("/", (req, res) => {
          res.send("My First Service in Express JS...");
      })
      app.get("/prashant", (req,res) => {
          res.send("Hi I am Prashant from Wipro...");
      })
      app.get("/show/:name", (req, res) => {
          const name = req.params.name;
          res.send("Hi Welcome to " +name);
      })
      app.get("/play",(req,res)=>{
          res.send("Lets play cricket")
      })
      app.listen(1111, (req, res) => {
          console.log("Node Js Application Started...");
          
      })    