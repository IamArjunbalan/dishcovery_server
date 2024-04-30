// import mongoose 

const mongoose = require('mongoose')


// define schema 

const adminschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        
            
            
    },
  
   
})
const admins = mongoose.model('admins', adminschema)

module.exports = admins