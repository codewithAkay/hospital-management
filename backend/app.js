const dotenv=require("dotenv").config()
const express =require('express')
const cors=require('cors')
const path=require("path")
const http = require('http');


const app=express()
 

app.use(express.static(path.join(__dirname,'build')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',require('./routes/router.js'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'build', 'index.html'));
  });
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://13.50.249.180:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

 
  const PORT = 4000;
  
  const server = http.createServer;
   
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });