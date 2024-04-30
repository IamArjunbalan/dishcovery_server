// import admin model
const mongoose = require('mongoose')
const admins=require('../Models/adminModel')
const jwt=require('jsonwebtoken')

exports.register = async (req, res) => {
    console.log('inside register function')
    const { username, password, email } = req.body
    console.log(`username:${username},password:${password},Email:${email}`)
    try{
        const existingAdmin = await admins.findOne({ email,password })
    console.log(existingAdmin)
    if (existingAdmin) {
        res.status(406).json("User Already Exist..")
    }
    else {
        const newUser = new admins({ username, password, email})
        await newUser.save()
        res.status(200).json(newUser)

    }

    }
    catch(err){
        res.status(401).json("something went wrong,"+err)

    }
}