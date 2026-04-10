const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { fullname, email, password } = req.body;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User registered succesfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
module.exports = {
  registerUser,
  loginUser,
};
