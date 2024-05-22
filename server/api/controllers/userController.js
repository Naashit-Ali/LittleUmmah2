const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        
        jwt.sign({ userID:user._id }, "bike5672" , { expiresIn: "7d" }, 
        function(err, token) {
          res.status(200).json({ message: "Login successfully", user: user, token: token });
        //  res.send({ message: "Login successfully", user: user, token: token });
        });
      } else {
        res.status(400).json({ message: "Invalid email or password" });
       // res.send({ message: "Invalid email or password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    //  res.send({ message: "User not found" });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};


const register = async (req, res) => {
  console.log(req.body);
  try {
    const { fname, lname, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send({ message: "User is already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        fname,
        lname,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.send({ message: "Account has been created!! Please Login" });
    }
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  register,
};
