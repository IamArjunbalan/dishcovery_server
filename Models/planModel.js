const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:String,
        required:true
    },
    instruction:{
        type:String,
        required:true
    },
   
    preptime: {
        type: String,
        required: true,
        
            
            
    },
    cooktime: {
        type: String,
        required: true,
        
            
            
    },
    category: {
        type: String,
        required: true,
        
            
            
    },
    userId:{
        type:String,
        required:true

    }

})
const plans = mongoose.model('plans', planSchema)
module.exports = plans

