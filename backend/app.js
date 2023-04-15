const express =require('express')
const cors=require('cors')
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use('/',require('./routes/router.js'))

app.listen(4000,()=>{
    console.log(`server is Running at https://localhost:4000`)
})