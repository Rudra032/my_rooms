import express from "express";
import userModel from "../zmodels/user.js"; // Import userModel

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const newUser = new userModel(req.body);

  try {
    const user = await newUser.save();

    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(500).json({ error: "Failed to register user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password }); // Find user by email and password
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };
      res.send(temp);
    } else {
      res.status(401).json({ message: "Login Failed" }); // Unauthorized status code
    }
  } catch (error) {
    return res.status(500).json({ error: "Failed to login" });
  }
});

router.post("/getallusers", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});


export default router;
