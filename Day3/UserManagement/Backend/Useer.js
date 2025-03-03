var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

app.use(bodyParser.json());
app.use(cors());

let users = [
    {"id":"1","name":"Prashant","username":"parshu","email":"parshu@gmail.com"},
    {"id":"2","name":"laksy","username":"lucky","email":"l@gmail.com"},
    {"id":"3","name":"sham","username":"jain","email":"s@gmail.com"},
    {"id":"4","name":"sai","username":"shravani","email":"ss@gmail.com"},
   
]

app.get("/showuser", (req,res) => {
    res.status(200).json(users);
})

app.post('/adduser', function (req, res) {
   
    let newItem = {
          id:req.body.id,
          name: req.body.name,
        username: req.body.username,
        email: req.body.email,
     
    }

    users.push(newItem);

    res.status(201).json({
        'message': "successfully created"
    });
});

app.get("/Searchuser/:id", (req, res) => {
    let found = users.find(function (item) {
          
        return item.id == parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
})

app.listen(1001, (req, res) => {
    console.log("Node Js Application Started...1001");
})