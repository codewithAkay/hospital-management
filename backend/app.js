const dotenv=require("dotenv").config()
const express =require('express')
const cors=require('cors')
const path=require("path")

const app=express()
const port=process.env.PORT || 4000  

app.use(express.static(path.join(__dirname,'build')));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',require('./routes/router.js'))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'build','index.html'));
  });

app.listen(port,()=>{
    console.log(`server is Running at https://localhost:${port}`)
})