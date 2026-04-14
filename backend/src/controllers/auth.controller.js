async function loginUser(req, res) {
  try {
    // Hardcoded credentials
    const STATIC_EMAIL = "reachxgroup@gmail.com";
    const STATIC_PASSWORD = "Reachxgroup@2026";

    // Get data from request body
    const { email, password } = req.body;

    console.log("Login attempt:", email);

    // Check email
    if (email !== STATIC_EMAIL) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    if (password !== STATIC_PASSWORD) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Success response
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: "static-id-123",
        fullname: "ReachX Admin",
        email: STATIC_EMAIL,
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
  loginUser,
};