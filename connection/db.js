// import mongoose 
const mongoose=require('mongoose')

// connection string 
const connectString=process.env.DATABASE

mongoose.connect(connectString).then(()=>{
    console.log('MongoDB server is connected!!')
}).catch(rej=>{
    console.log( 'MongoDB connection failed :',rej)
})