const dotenv=require("dotenv").config()
const express =require('express')
const cors=require('cors')
const path=require("path")
const http = require('http');


const app=express()
 

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',require('./routes/router.js'))
 
  const PORT = 4000;
  
  const server = http.createServer;
   
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });