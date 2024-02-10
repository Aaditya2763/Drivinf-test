const expressAsyncHandler = require("express-async-handler");
const User = require("../../modal/user/auth");
const generateToken = require("../../config/tokenConfig");

//register controller
const userRegisterController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const userExists = await User.findOne({ email: req?.body?.email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
    // throw new Error("User already exists");
  }

  try {
    const user = await User.create({
      userName: req?.body?.userName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.json(error.message);
  }
});

//Login controller

const userLoginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;

  //check if user exists
  const userFound = await User.findOne({ email });
  //Check if password is match

  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      userName: userFound?.userName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      userName: userFound.firstName,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      address1: userFound.address1,
      address2: userFound.address2,
      city: userFound.city,
      state: userFound.state,
      zip: userFound.zip,
      country: userFound.country,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      isRegisteredDrivingTest:userFound.isRegisteredDrivingTest,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(400).json({ message: "Invalid password" });
  }
});

//logout controller
const logoutController = (req, res) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Redirect or respond as needed after logout
    res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = {
  userRegisterController,
  userLoginController,
  logoutController,
};
