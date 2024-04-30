const mongoose = require('mongoose')
const users =require('../Models/userModel')
const admins=require('../Models/adminModel')
const reviews=require('../Models/reviewModel')
const dishes=require('../Models/dishModel')
const plans=require('../Models/planModel')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log('inside register function')
    const { username, password, email } = req.body
    console.log(`username:${username},password:${password},Email:${email}`)
    try{
        const existingUser = await users.findOne({ email })
    console.log(existingUser)
    if (existingUser) {
        res.status(406).json("User Already Exist..")
    }
    else {
        const newUser = new users({ username, password, email})
        await newUser.save()
        res.status(200).json(newUser)

    }

    }
    catch(err){
        res.status(401).json("something went wrong,"+err)

    }
}

exports.login=async (req,res)=>{
    console.log("inside login function");
    const{email,password}=req.body
    try{
        const existingUser=await users.findOne({email,password})
        const existingAdmin=await admins.findOne({email,password})
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRETKEY)
            res.status(200).json({
                existingUser,
                role:'user',
                token
            })
        }
        else{
            if(existingAdmin){
                const token=jwt.sign({userId:existingAdmin._id},process.env.JWT_SECRETKEY)
                res.status(200).json({
                    existingAdmin,
                    role:'admin',
                    token
                })
            }
            
        
        else{
            res.status(406).json("invalid email/password")
        }
    }
    }
    catch(err){
        res.status(500).json("something went wrong",err)
    }
}

exports. addReviews=async(req,res)=>{
    console.log("inside addreview function!!")
    console.log(req.file)
    const{name,email,phone,location,message}=req.body
    console.log(`${name},${email},${phone},${location}${message},`)
    
    
    try{

        const existingUser=await reviews.findOne()
            const newDetails=new reviews({ name,email,phone,location,message})
            await newDetails.save()
            res.status(200).json(newDetails)


    }
    catch(err){
        res.status(401).json("something wrong:"+err)

    }

}

exports.viewReview=async(req,res)=>{
    console.log("inside user Review")
    console.log(req.payload);
    try{
        const data=await reviews.find()
        console.log(data)
        res.status(200).json(data)
    }
    catch(err){
        res.status(401).json(err)

    }
}

exports.deleteReview= async (req, res) => {
    const { id } = req.params
    console.log("inside delete favourite function")
    try {
        const result = await reviews.findByIdAndDelete({ _id: id })
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// exports. addDishes=async(req,res)=>{
//     console.log("inside addDish function!!")
//     console.log(req.file)
//     const{name,ingredients,instruction,preptime,cooktime,category,userId}=req.body
//     console.log(`${name},${ingredients},${instruction},${preptime},${cooktime},${category},${userId}`)
//     const details_image=req.file.filename
//     // res.send("Add projects request is hit!!")
//     try{
//         const existingUser=await dishes.findOne()
//         if(existingUser){
//             res.status(406).json("Existing details")
//         }
        
//         else{
//             const newDetails=new details({details_image, name,ingredients,instruction,preptime,cooktime,category,userId})
//             await newDetails.save()
//             res.status(200).json(newDetails)
//         }


//     }
//     catch(err){
//         res.status(401).json("something wrong:"+err)

//     }
// }

exports. addDishes=async(req,res)=>{
    console.log("inside addDish function!!")
    console.log(req.file)
    const{image,name,ingredients,instruction,preptime,cooktime,category,youtube}=req.body
    const userId=req.payload
    console.log(`${image},${name},${ingredients},${instruction},${preptime},${cooktime},${category},${userId},${youtube}`)
    // const details_image=req.file.filename
    // res.send("Add projects request is hit!!")
    try{
        const existingUser=await dishes.find({userId})
        
        
        
            const newDetails=new dishes({image, name,ingredients,instruction,preptime,cooktime,category,youtube,userId})
            await newDetails.save()
            res.status(200).json(newDetails)
        


    }
    catch(err){
        res.status(401).json("something wrong:"+err)

    }
}
exports.viewDishes=async(req,res)=>{
    console.log("inside  dish")
    console.log(req.payload);
    try{
        const data=await dishes.find()
        console.log(data)
        res.status(200).json(data)
    }
    catch(err){
        res.status(401).json(err)

    }
}

exports.getspecificDish=async(req,res)=>{
    try{
        console.log('inside here!')
        console.log('hello')
        console.log(req.params.id)
        
        const result=await dishes.findOne({_id:req.params.id})
        console.log(result)
        
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)

    }
}

exports.addToplan=async(req,res)=>{
    console.log('inside add plan function')
    const{image,name,ingredients,instruction,preptime,cooktime,category}=req.body
    const userId=req.payload
    const _id=req.params.id
    
    try{
        const existingproduct= await plans.findOne({userId,_id})
        console.log(req.params.id)
       
        
        if(existingproduct){
            res.status(406).json("dish already exist ")
        }
        else{
            const newItem= new plans({image,name,ingredients,instruction,preptime,cooktime,category,userId})
            newItem.save()
            res.status(201).json(newItem)
        }
    }catch(err){
        res.status(404).json(err)
    }
}

exports.getPlan=async(req,res)=>{
    try{
        const userId=req.payload
        const plandishes=await plans.find({userId})
        res.status(200).json(plandishes)

    }catch(err){
        res.status(401).json(err)
    }
   
}

exports.removeFromPlan=async(req,res)=>{
    try{
        const planId= req.params.id
        const plandelete=await plans.findOneAndDelete({_id:planId})
        res.status(200).json(plandelete)

    }catch(err){
        res.status(401).json(err)
    }
}

exports.adminDeleteDish= async (req, res) => {
    const { id } = req.params
    console.log("inside delete admin")
    try {
        const result = await dishes.findByIdAndDelete({ _id: id })
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

