const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req,res)=>{

 const fname = req.body.fname;
  const lname = req.body.lname;
  const mail = req.body.email;
  const data = {
    member:[
      {email_address: mail,
        status: "subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname,
        }
        }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/1a323462e3";
  const options = {
    method:"POST",
    auth:"aarthy:e1a2b21d7adb184c9cd9513ef296835e-us8"
  }

  const request = https.request(url,options,function(response){
    if(res.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
    res.on("data",function(data){
      console.log(JSON.parse(data))
    })
    console.log(res.statusCode);


  })

  request.write(jsonData);
  request.end();
  console.log(fname);
  console.log(lname);
  console.log(mail);

});

app.post("/failure",(req,res)=>{
  res.redirect("/");
});

app.listen( process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000")
});
