const express=require('express');
const { userRegisterController, userLoginController, logoutController } = require('../../controllers/authcontroller/authController');
const authRoutes=express.Router();

//auth route
authRoutes.post('/register',userRegisterController);
authRoutes.post('/login',userLoginController);
authRoutes.post('/logout',logoutController)


module.exports=authRoutes