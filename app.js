const express=require("express");
const bodyParser=require("body-parser");
//const ejs=require("ejs");// not require.
const port=3000;
const app=express();
// now we use ejs templating to avoid write more html file containg almost same code.
app.set('view engine', 'ejs');
// make avilable static file.
app.use(express.static("public"));
// using boydy-parser
app.use(bodyParser.urlencoded({extended:true}));

// use a function to get today date
//const echoDay=["sunday","monday","tuesday","wednesday","Thursday","Friday","saturday"];
var today=new Date();
var dayId=today.getDay();// it return integer coreespond to today day.
var dateId=today.getDate();
var data1=["WELCOME","How Are you","Make your list:"];// creating Array to store previous data avilable in to doList.
var workList=[];
// formating day and date with option
var options={
    weekday:"long",
    day:"numeric",
    month:"long"
};
var strDay=today.toDateString("en-US",options);// formating day date string.
app.listen(port,function()
{
    console.log("Server started at port 3000");
   // console.log(dateId);
});
app.get("/", (req, res) => {
    res.render("list", {day: strDay,newItems:data1});// we use render to use ejs with html 
  });   
  app.post("/",function(req,res)
  {
    let logi=req.body.list;
    if(logi=="WorkDay")
    {
      workList.push(req.body.item);
      res.redirect("/work");
    }else{
    //console.log(req.body);
    data1.push(req.body.item);
    res.redirect("/");
    }// we dont use render because previour data get lost.
  });                       
 app.get("/work",function(req,res)
{
  //   res.write("working");
  //  // res.write(echoDay[ dayId]);
  //   res.send();
  res.render("list", {day:"WorkDay",newItems:workList});
});