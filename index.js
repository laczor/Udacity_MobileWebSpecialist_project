var express = require("express");
var app     = express();

// To tell express what should be the routefile for the files

app.use(express.static(__dirname));
//Store all HTML files in view folder.

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.listen(3000);

console.log("Running at Port 3000");