//jshint esversion: 6

const express=require("express");
const bodyParser=require("body-parser");
const request= require("request");
const https=require("https");


const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  var firstName= req.body.fName;
  var lastName= req.body.lName;
  var email= req.body.email;
  var phoneno= req.body.phone;

  var data= {
    members:[
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        PHONE: phoneno
        }
      }
    ]
  };

    const jsonData= JSON.stringify(data);

    const url= "https://us10.api.mailchimp.com/3.0/lists/c7a53dd074";
    const options={
      method: "POST",
      auth:"abbas1:5f11be4626cb34ee7723997612728a04-us10"
    }



    const request=https.request(url, options , function(response){

      if (response.statusCode==200){
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })

    })

       request.write(jsonData);
       request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/")
})


app.post("/success", function(req, res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
});


// API KEYS
// 5f11be4626cb34ee7723997612728a04-us10

// list // ID
// c7a53dd074
