const express =require("express");
const https=require("https");
const bodyparser=require("body-parser");
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){

var cn=(req.body.cityname);
const url="https://api.openweathermap.org/data/2.5/weather?q="+cn+"&appid=56b4a4919e0c80a6652c5f2c8140e97b&units=standard#";
https.get(url,function(response){
// console.log(response);

response.on("data",function(data){
const weatherdata=JSON.parse(data);
res.writeHead(200 , {'Content-Type' : 'text/html'})
const iconurl= "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png";

res.write("The weather is currently"+weatherdata.weather[0].description+".");
res.write("<h1>The Tempreature in "+cn+" is "+weatherdata.main.temp+" degree celcius.</h1>");
res.write("<img src="+iconurl+">");
// res.write('<h1>Hello Express!</h1>');
res.send();
});

});
});
// const url="https://api.openweathermap.org/data/2.5/weather?q=Madhubani&appid=56b4a4919e0c80a6652c5f2c8140e97b&units=standard#";
// https.get(url,function(response){
// // console.log(response);
//
// response.on("data",function(data){
// const weatherdata=JSON.parse(data);
// res.writeHead(200 , {'Content-Type' : 'text/html'})
// const iconurl= "http://openweathermap.org/img/wn/"+weatherdata.weather[0].icon+"@2x.png";
//
// res.write("The weather is currently"+weatherdata.weather[0].description+".");
// res.write("<h1>The Tempreature in Madhubani is "+weatherdata.main.temp+"degree celcius.</h1>");
// res.write("<img src="+iconurl+">");
// // res.write('<h1>Hello Express!</h1>');
// res.send();
// });
//
// });

app.listen(3000,function(){

console.log("Server start listening at port 3000");
});
