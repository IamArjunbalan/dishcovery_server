const express=require("express")

const usercontroller=require('../Controllers/userController')
const admincontroller=require('../Controllers/adminController')

const jwtmiddleware=require('../Middlewares/jwtMiddleware')

const multerConfig=require('../Middlewares/dishesMiddleware')
const router=new express.Router()


router.post('/user/register',usercontroller.register)
router.post('/admin/register',admincontroller.register)
router.post('/user/login',usercontroller.login)
router.post('/user/review',usercontroller.addReviews)
router.get('/user/viewReview',usercontroller.viewReview)
router.delete('/user/deleteReview/:id',jwtmiddleware,usercontroller.deleteReview)
// router.post('/user/adddishes',jwtmiddleware,multerConfig.single('details_image'),usercontroller.addDishes)
router.post('/user/adddishes',jwtmiddleware,usercontroller.addDishes)
router.get('/user/viewdishes',usercontroller.viewDishes)
router.get('/get-dish/:id',usercontroller.getspecificDish)
router.post('/addplan',jwtmiddleware,usercontroller.addToplan)
router.get('/getplan',jwtmiddleware,usercontroller.getPlan)
router.delete('/plandelete/:id',usercontroller.removeFromPlan)
router.delete('/deleteAdmin/:id',jwtmiddleware,usercontroller.adminDeleteDish)


module.exports=router