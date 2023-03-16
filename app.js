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

// use mongoose
const mongoose = require('mongoose');

run().catch(error => console.log(error.stack));

async function run() {
  await mongoose.connect('mongodb://localhost:27017/TodoList', { useNewUrlParser: true });

  // Clear the database every time. This is for the sake of example only,
  // don't do this in prod :)
 

  //creating the monogodb shema
  const listSchema = new mongoose.Schema({ workList: String});

  //creating model with ('collectionsName',shema);
  const listModel = mongoose.model('WORKLIST', listSchema);
  // geting data from database and insert in our arrayv
  var data1=[];
  // const docs =await listModel.find();
 
  
  //  // console.log(docs);
  //  const listArr=( docs.map(doc => doc.workList).sort());
  //  for(const item of listArr)
  //  {
  //   //console.log(item);
  //   data1.push(item);
  //  }

  








// use a function to get today date
//const echoDay=["sunday","monday","tuesday","wednesday","Thursday","Friday","saturday"];
var today=new Date();
var dayId=today.getDay();// it return integer coreespond to today day.
var dateId=today.getDate();
// creating Array to store previous data avilable in to doList.
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

  // Reading data from database.
  run().catch(error => console.log(error.stack));
async function run()
{

  const docs =await listModel.find();
 
  
  // console.log(docs);
  data1=[];
  const listArr=( docs.map(doc => doc.workList).sort());
  for(const item of listArr)
  {
   //console.log(item);
   data1.push(item);
  }

    res.render("list", {day: strDay,newItems:data1});// we use render to use ejs with html 
}
  });   
         
 app.get("/work",function(req,res)
{
  //   res.write("working");
  //  // res.write(echoDay[ dayId]);
  //   res.send();
  res.render("list", {day:"WorkDay",newItems:workList});
});


// mogodb connection

// insert one document or one by one

// taking post request
app.post("/",function(req,res)
{
  let logi=req.body.list;
  if(logi=="WorkDay")
  {
    workList.push(req.body.item);
    res.redirect("/work");
  }else{
  //console.log(req.body);
  //data1.push(req.body.item);
  
  // we dont use render because previour data get lost.
// inserting document to our Database.
  run().catch(error => console.log(error.stack));
  async function run()
  {
 await listModel.create({ workList: req.body.item});
 console.log("inserted");
   // console.log(docs);
 res.redirect("/");
  }
}

});   
}            
  

  
  // how to insert many document int one run

  // createin the array of document
  
//   const [docs]=await personDetail.insertMany(Details);
//  console.log( docs instanceof personDetail);// it return true on successfull insertion.
//  console.log(docs.age)
