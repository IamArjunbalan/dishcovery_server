// to .env variable while server is running-importing dotenv

require('dotenv').config()
// importing express.js

const express=require('express')
const cors=require('cors')
const router=require('./Routes/router')


const dishcovery=express()
dishcovery.use(cors())
dishcovery.use(express.json())
require('./connection/db')
dishcovery.use(router)

const middleware=require('./Middlewares/userMiddleware')
dishcovery.use(middleware)

const PORT=3000 || process.env.PORT

// serving upload files
dishcovery.use('/upload',express.static('./uploads'))

dishcovery.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`)
})
dishcovery.get('/',(req,res)=>{
    res.send("<h1> server is running successfully!!!</h1>")
})