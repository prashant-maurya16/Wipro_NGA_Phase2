var express = require("express");
app = express();


//simple url
app.get("/",(req,res)=>{
          res.send("This is my first react program in express js");
})

//url with name parameter
app.get("/showname/:name",(req,res)=>{
const name = req.params.name;
res.send("The name coming from  URL us:"+name);
})

//url with multiple parameters
app.get("/showFullname/:Firstname/:Lastname",(req,res)=>{
          const Firstname = req.params.Firstname;
          const Lastname= req.params.Lastname;
          const Fullname= Firstname+ " " + Lastname;
          res.send("Full name coming from URL is : "+Fullname);
})

//url with multiple paramters of information
app.get("/showInfo/:city/:company", (req,res) => {
          const city = req.params.city;
          const company = req.params.company;
          res.send("City name coming from URL  is  " +city+  "....Company name Coming from URL  is  " +company);
      })

app.listen(3000,(req,res)=>{
          console.log("Server is running succusefully...");
})