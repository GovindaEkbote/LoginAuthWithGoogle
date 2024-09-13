require("dotenv").config();
const express = require('express');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./db/conn");
const router = require('express').Router();
const bcrypt = require("bcrypt")

const app = express();
const PORT = 4000;

// Middleware for CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}));

// Middleware for parsing JSON
app.use(express.json());
app.use(cors())

// Set up session
app.use(session({
    secret: "1234567890qwertyu",
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Google OAuth strategy
passport.use(
    new GoogleStrategy({
        CLIENT_ID : 'your-client-id',
        CLIENT_SECRET = 'your-client-secret',
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    username: profile.emails[0].value,
                    email: profile.emails[0].value,
                });
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google authentication routes
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "http://localhost:3000/login"
}));


app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false
        });
      }
  
      // Compare the password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
          success: false
        });
      }
  
      // Successful login response
      res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username
        }
      });
  
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        success: false
      });
    }
  });

app.post("/signup", async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists. You can login.",
                success: false
            });
        }

        const userModel = new User({ name, username, email });
        userModel.password = await bcrypt.hash(password, 10); // Hash the password

        await userModel.save();

        res.status(201).json({
            message: "Sign Up Successful",
            success: true
        });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
});
// Start server
app.listen(PORT, () => {
    console.log("Server started on port", PORT);
});
