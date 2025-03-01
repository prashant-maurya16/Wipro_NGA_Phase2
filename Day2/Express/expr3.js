var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(bodyParser.json());

let students = [
          {"stuno":1,"name":"Prashant","basic":88234},
          {"stuno":2,"name":"laksy","basic":90032},
          {"stuno":3,"name":"samiksha","basic":91153},
          {"stuno":4,"name":"sai","basic":90023},
          {"stuno":5,"name":"pranati","basic":98823},
      ]
      app.get("/showStudent", (req,res) => {
          res.status(200).json(students);
      })
      app.get("/searchStudent/:stuno", (req, res) => {
          let found = students.find(function (item) {
              return item.stuno === parseInt(req.params.stuno);
          });
          if (found) {
              res.status(200).json(found);
          } else {
              res.sendStatus(404);
          }
      })
      app.get("/searchStudentbyName/:name", (req, res) => {
          let found = students.find(function (item) {
              return item.name === (req.params.name);
          });
          if (found) {
              res.status(200).json(found);
          } else {
              res.sendStatus(404);
          }
      })
      app.listen(1113, (req, res) => {
          console.log("Node Js Application Started...");
      })



