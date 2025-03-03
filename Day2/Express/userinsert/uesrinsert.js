import { useState } from "react";
import axios from "axios";
import Menu from "../Menu/menu";
const UserInsert = () => {

          const [data, setData] = useState({
                    id : 0, 
                    name : '',
                    username : '',
                    email : '',
                })
                const handleChange = event => {
                    setData({
                        ...data,[event.target.name] : event.target.value  
                    })
                }

                const addUser = () => {
                    axios.post("http://localhost:2222/adduser",{
                      id : data.id,
                      name : data.name,
                      username : data.username,
                      email : data.email,
                    }).then(resp => {
                    //   alert(resp.data);
                      console.log(resp.data);
                    })
                  }

                return(
                    <div>
                              <Menu/>
                        <label>Id: </label>
                        <input type="number" name="empno" 
                            value={data.id} onChange={handleChange} /> <br/><br/>
                        <label> Name : </label>
                        <input type="text" name="name" 
                            value={data.name} onChange={handleChange} /> <br/><br/> 
                        <label>UserName </label>
                        <input type="text" name="user" 
                            value={data.username} onChange={handleChange} /> <br/><br/> 
                             <input type="text" name="email" 
                            value={data.email} onChange={handleChange} /> <br/><br/> 
                        <input type="button" value="Add user" onClick={addUser} /> 
                     </div>
                )   


 }
 export default UserInsert


 /*
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
 
 app.get("/searchuser/:id", (req, res) => {
     let found = users.find(function (item) {
           
         return item.id === parseInt(req.params.username);
     });
     if (found) {
         res.status(200).json(found);
     } else {
         res.sendStatus(404);
     }
 })
 
 app.listen(1111, (req, res) => {
     console.log("Node Js Application Started...1114");
 })
 
 
 */