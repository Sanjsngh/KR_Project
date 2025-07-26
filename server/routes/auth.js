const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const { cleanUpAndValidate } = require("../utils/authUtil");
const User = require("../MODELS/userSchema.js");

const upload = require("../middleware/upload.js");


router.get("/", (req, res) => {
    return res.send("Login to see your profile");
})

router.post("/register",  upload.single('image'), async(req, res) => {
    // console.log(image);
    const {email, password, username} = req.body;
    const image = req.file?.filename || "";
    console.log(image)

    // data validation 
    try {
        await cleanUpAndValidate({username, password, email});

        const userExist = await User.findOne({email});
        if(userExist) {
            return res.status(409).send({
                status: 409,
                message: "User already exists",
            })
        }

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save new user
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
            image,
        });

        const userDb = await user.save();
        return res.status(201).send({
            status: 201,
            message: "User registered successfully",
            data: userDb
        });

    }
    catch(err) {
        // const statusCode = err.code === 11000 ? 409 : (err.name === "ValidationError" ? 400 : 500)
        if(err.code === 11000) {
            const dupField = Object.keys(err.keyValue)[0];
            
            return res.status(409).send({
                status: 409,
                message: `Duplicate key ${dupField} already Exist`,
                error: err
            })
            
        }
        const statusCode =  err.status || 500;
        return res.status(statusCode).send({
            status: statusCode,
            message: err.message || "Server Error",
            error: err
        })
    }
});

router.post("/login", async (req, res) => {
    const { loginId, password } = req.body;

    // Validate the input
    if (!loginId || !password) {
        return res.status(400).send({
            status: 400,
            message: "Missing credentials",
        });
    }

    if (typeof loginId !== "string" || typeof password !== "string") {
        return res.status(400).send({
            status: 400,
            message: "Invalid data format",
        });
    }

    try {
        // Determine whether loginId is an email or username
        let userDb;
        if (validator.isEmail(loginId)) {
            userDb = await User.findOne({ email: loginId });
        } else {
            userDb = await User.findOne({ username: loginId });
        }

        // User not found
        if (!userDb) {
            return res.status(400).send({
                status: 400,
                message: "User not found. Please register first.",
            });
        }

        // Compare the passwords
        const isMatch = await bcrypt.compare(password, userDb.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Invalid credentials: Password doesn't match",
            });
        }

        // Create JWT payload
        const payload = {
            id: userDb._id,
            username: userDb.username,
        };

        // Generate token
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10h" });

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            data: { token },
        });
    } catch (error) {
        console.error("Error in /login:", error);
        return res.status(500).send({
            status: 500,
            message: "Server error occurred",
            error: error.message || error,
        });
    }
});


router.get("/profile", authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; 
      const user = await User.findById(userId).select("-password"); // exclude password
  
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      const imageURL = user.image ? `${req.protocol}://${req.get("host")}/uploads/${user.image}`: null;
  
      res.status(200).json({
        status: 200,
        message: "Profile data fetched successfully",
        user: {
            ...user.toObject(),
            image: imageURL
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Server error",
        error: error.message,
      });
    }
  });
  
module.exports = router;