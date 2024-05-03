const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { authController } = require("../controllers/authController");
const cors = require('cors');


const route = express.Router();

// Initialize express-session middleware before Passport.js
route.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false
}));

// Use cors middleware with specific origin and credentials
route.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend origin
    credentials: true
}));

// Initialize Passport.js middleware
route.use(passport.initialize());
route.use(passport.session());

// Google authentication route
route.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback endpoint for Google authentication
route.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: "http://localhost:3001/Pages/SignInPage",successRedirect: "http://localhost:3001/Pages/HomePageSathiska"}), (req, res) => {
    // This callback will be executed upon successful authentication
    console.log("User Authenticated");

});

// Route for handling successful login
route.get("/login/success", (req, res) => {
    console.log(req);   

    res.status(200).send({
        success:true,
        message:"User Logged In",
        user:req.user
    })

});

// Get curretn user all details
route.post("/googleid", authController);

module.exports = route;
