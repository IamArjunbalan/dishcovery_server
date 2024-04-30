const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middleware!");

try{
    const token=req.headers.authorization.split(" ")[1]
    console.log(token)
    const result = jwt.verify(token,process.env.JWT_SECRETKEY)
    console.log(result)
    req.payload=result.userId
    
    next()
}
catch{
    res.status(401).json("Authorization failed !! Login First!!")
}
}
module.exports=jwtMiddleware