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
  app.use(cors({
    origin: ''
}));
const whitelist = ['http://localhost:4000', 'http://13.50.249.180:4000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}
 
  const PORT = 4000;
  
  const server = http.createServer;
   
  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });