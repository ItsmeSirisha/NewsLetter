const express =require("express");
const bodyParser=require("body-parser");
const https=require("https");
const http=require("http");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
 app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
 });
 app.post("/",function(req,res){
const firstname=req.body.fname;
const lastname=req.body.lname;
const email=req.body.email;
const data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
    }
  }
  ]
};
const jsondata=JSON.stringify(data);

const url="https://us11.api.mailchimp.com/3.0/lists/88e6ffbf49";

const options={
  method:"POST",
  auth:"siri:9cfc2422508ee139fd03bf867e832906-us11"

}
const request=https.request(url,options,function(response){
  console.log(response.statusCode);
if(response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
}
else{
    res.sendFile(__dirname + "/failure.html");
}
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsondata);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")

})
 app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
})

//e0e726b8ea340142fa31ad6462f35f80-us11
// 88e6ffbf49
