const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
   
    message: {
        type: String,
        required: true,
        
            
            
    }
    // userId:{
    //     type:String,
    //     required:true

    // }

})
const reviews = mongoose.model('reviews', reviewSchema)
module.exports = reviews