const expressAsyncHandler = require("express-async-handler");
const User = require("../../modal/user/auth");
const generateToken = require("../../config/tokenConfig");



//register controller
const drivingtestRegistrationController = expressAsyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  // console.log(req.body)
  const user=await User.findById(id);

  if (user){
    try {
      // Check if user with the provided ID exist
          // User with the provided ID already exists, so update the user details
          const updatedUser = await User.findByIdAndUpdate(id, {
              userName: req.body.firstName,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              address1: req.body.address1,
              address2: req.body.address2,
              city: req.body.city,
              state: req.body.state,
              zip: req.body.zip,
              country: req.body.country,
              isRegisteredDrivingTest:true,
          }, { new: true }); // Set { new: true } to return the updated user after update operation
          
          // console.log(updatedUser)
          res.status(200).json(updatedUser);
    
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
  }
  else{
    res.status(500).json({ message: "Something went wrong "});
  }
});


  module.exports = {
    drivingtestRegistrationController
  };