const express=require('express');
const { drivingtestRegistrationController } = require('../../controllers/authcontroller/userController');

const userRoutes=express.Router();

// user Routes//
userRoutes.post('/test-registration',drivingtestRegistrationController);
// userRoutes.post('/login',userLoginController);
// userRoutes.post('/logout',logoutController)

module.exports=userRoutes;