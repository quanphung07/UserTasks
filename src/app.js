const express=require('express')
require('../db/mongoose')
const port=process.env.PORT||3000
const userRouter=require('./controller/userRouter')
const jobRouter=require('./controller/jobRouter')
const app=express()

app.use(express.json())
app.use(userRouter)
app.use(jobRouter)

app.listen(port,()=>{
    console.log('serve up')
})