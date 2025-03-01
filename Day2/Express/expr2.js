var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(cors());
app.use(bodyParser.json());
let employs = [
          {"empno":1,"name":"Prasanna","basic":88234},
          {"empno":2,"name":"Rajesh","basic":90032},
          {"empno":3,"name":"Kalyan","basic":91153},
          {"empno":4,"name":"Abhishiek","basic":90023},
          {"empno":5,"name":"Srikar","basic":98823},
      ]
      
      app.get("/showemploy", (req,res) => {
          res.status(200).json(employs);
      })
      app.get("/searchemploy/:empno", (req, res) => {
          let found = employs.find(function (item) {
              return item.empno === parseInt(req.params.empno);
          });
          if (found) {
              res.status(200).json(found);
          } else {
              res.sendStatus(404);
          }
      })
      app.post('/addemploy', function (req, res) {
   
          let newItem = {
              empno: req.body.empno,
              name: req.body.name,
              basic: req.body.basic
              // roll_no: req.body.roll_no
          }
      
          employs.push(newItem);
      
          res.status(201).json({
              'message': "successfully created"
          });
      });
      app.listen(1113, (req, res) => {
          console.log("Node Js Application Started...");
      })