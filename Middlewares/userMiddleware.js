const sampleMiddleware=(req,res,next)=>{
    console.log("Middleware is on act!!!")
    next()
}
module.exports=sampleMiddleware