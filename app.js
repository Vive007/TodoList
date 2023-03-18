const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
//const ejs=require("ejs");// not require.
const port=3000;
const app=express();

app.use((req, res, next) => {
    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
        return res.sendStatus(204);
    }
    return next();
});










// now we use ejs templating to avoid write more html file containg almost same code.
app.set('view engine', 'ejs');
// make avilable static file.
app.use(express.static("public"));
// using boydy-parser
app.use(bodyParser.urlencoded({extended:true}));

// use mongoose
const mongoose = require('mongoose');
const { query } = require("express");
var flag=true;

run().catch(error => console.log(error.stack));

async function run() {
  await mongoose.connect('mongodb://localhost:27017/TodoList', { useNewUrlParser: true });
  let qrModel="";

 //creating the monogodb shema
 const listSchema = new mongoose.Schema({ workList:String});
 //const listModel = mongoose.model('WORKLIST', listSchema);


 if (qrModel === null) {
  qrModel = mongoose.model("WORKLIST", listSchema);
}

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
let query='';
let arr=[];
var data1;


 app.get("/", (req, res) => {

  // Reading data from database.
  run().catch(error => console.log(error.stack));
async function run()
{
  qrModel = mongoose.model("WORKLIST", listSchema);
  const docs =await qrModel.find();
 
  
  //console.log(docs);
 // console.log(docs.length);
  data1=docs;
//    const listArr=( docs.map(doc => doc.workList,doc=> doc._id).sort());
//   for(const item of listArr)
//   {
//    console.log(item);
//    //data1.push(item);
//   }
//data1.push(docs);
//console.log(data1);
//console.log(data1.length);
query="/";
    res.render("list", {day: strDay,newItems:data1});// we use render to use ejs with html 
}
  });   
 
  



  app.post("/",function(req,res)
  {
    let logi=req.body.list;
    run().catch(error => console.log(error.stack));
    async function run()
    {
    if(logi==query)
    {
     
      // qrModel = mongoose.model(query, listSchema);


      await qrModel.create({ workList: req.body.item});
     // workList.push(req.body.item);
      res.redirect("/"+query);
    }else{
    //console.log(req.body);
    //data1.push(req.body.item);
    
    // we dont use render because previour data get lost.
  // inserting document to our Database.
   
   await qrModel.create({ workList: req.body.item});
   console.log("inserted");
     // console.log(docs);
   res.redirect("/");
   query="/";
    }
  }
  
  });   

  app.get("/:topic",function(req,res)
  {
    run().catch(error => console.log(error.stack));
  async function run()
  {
   
   // console.log(qrModel);
    //const docs =await qrModel.find();
   // data1=docs;
    //   res.write("working");
    
   // console.log(req.params.topic);
     query=_.startCase(req.params.topic);
      qrModel = mongoose.model(query, listSchema);

      const docs =await qrModel.find();
   data1=docs;

    // arr.push(query);
    //  // res.write(echoDay[ dayId]);
    //   res.send();
    res.render("list", {day:query,newItems:data1});
   // query=`"/${query}"`;
   // console.log(query);
  }
  }
  );
  
// Deleting the data from database
app.post("/delete",function(req,res)
{
  
 // console.log(req.body);
 const id=(req.body.checkbox).trim();
 console.log(mongoose.isValidObjectId(id));// here I stuck due to id is string with extraspace so,it is not a valid object,so to make a valid object just add .trim();

qrModel.findByIdAndRemove(id)
  .then(function(doc) {
    console.log('Document removed: ', doc);
    if(query==="/")
    res.redirect("/");
    else{
      res.redirect("/"+query);
      
    }
  })
  .catch(function(err) {
    console.log('Error: ', err);
  })});
}



























//   // Clear the database every time. This is for the sake of example only,
//   // don't do this in prod :)
 

 
//   //creating model with ('collectionsName',shema);
  
//   const workMOdel=mongoose.model('Topic',listSchema);
//   // geting data from database and insert in our arrayv
//   var data1;
//   var query="";
//   //var customListData;
//   // const docs =await listModel.find();
 
  
//   //  // console.log(docs);
//   //  const listArr=( docs.map(doc => doc.workList).sort());
//   //  for(const item of listArr)
//   //  {
//   //   //console.log(item);
//   //   data1.push(item);
//   //  }

  








// // use a function to get today date


       
 

// console.log(query);
// // mogodb connection

// // insert one document or one by one

// // taking post request
// //const refe=`"/${query}"`;
// //console.log(refe);


// // Deleting list from database
// app.post("/delete",function(req,res)
// {
  
//  const id=(req.body.checkbox).trim();
//  console.log(mongoose.isValidObjectId(id));// here I stuck due to id is string with extraspace so,it is not a valid object,so to make a valid object just add .trim();

// listModel.findByIdAndRemove(id)
//   .then(function(doc) {
//     console.log('Document removed: ', doc);
//   })
//   .catch(function(err) {
//    // console.log('Error: ', err);
// workMOdel.findByIdAndRemove(id)
// .then(function(doc)
// {
//   console.log('Document removed:',doc);

// })
// .catch(function(err)
// {
//   console.log('Error',err);
// }
// );







//   });




//  res.redirect("/");
//   }
// );
// }





















  

  
  // how to insert many document int one run

  // createin the array of document
  
//   const [docs]=await personDetail.insertMany(Details);
//  console.log( docs instanceof personDetail);// it return true on successfull insertion.
//  console.log(docs.age)
app.listen(port,function()
{
    console.log("Server started at port 3000");
   // console.log(dateId);
});