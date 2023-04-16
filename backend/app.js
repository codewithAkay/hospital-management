const dotenv=require("dotenv").config()
const express =require('express')
const cors=require('cors')

const app=express()
const port=process.env.PORT || 4000  

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',require('./routes/router.js'))

app.listen(port,()=>{
    console.log(`server is Running at https://localhost:${port}`)
})