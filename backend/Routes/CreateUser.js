const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mongodbaacommunityaaserver";

// Sign up route
router.post(
  "/createuser",
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      // Create the user in the database
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
        date: Date.now()
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Login route
router.post(
  "/loginuser",
  [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
  ],
  async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;  // Correctly destructure from req.body
      let userdata = await User.findOne({ email });

      if (!userdata) {
        return res.status(400).json({ error: "Invalid Email or Password" });
      }

      const pwdcompare = await bcrypt.compare(password, userdata.password);  // Compare passwords correctly
      if (!pwdcompare) {
        return res.status(400).json({ error: "Invalid Email or Password" });
      }

      const data = {
        user: {
          id: userdata.id
        }
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = router;
