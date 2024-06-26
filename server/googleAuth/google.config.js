const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config } = require('./files');
const { Auth } = require("../models");
const jwt = require("jsonwebtoken");
const { where } = require('sequelize');


const googleAuth = (passport) => {

  passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.REDIRECT_URI

  }, async (accessToken, refreshToken, profile, callback) => {

    console.log("Profile details are:", profile);
    // localStorage.setItem("profile", profile.id);

    const token = jwt.sign({ id: profile.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log(token);

    // localStorage.setItem("token",token);
    const authData = await Auth.findOne({
      where: {
        googleId: profile.id
      }
    });

    if (!authData) {
      Auth.create({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        ImageLink: profile.photos[0].value,
        emailVerified: profile.emails[0].verified,
        jwt: token
      }).then((user) => {
        console.log("Google signIn Successful and Database Data added successfully");
      }).catch((error) => {
        console.error("Error creating user:", error);
      });
    } else {
      Auth.update({
        displayName: profile.displayName,
        email: profile.emails[0].value,
        ImageLink: profile.photos[0].value,
        emailVerified: profile.emails[0].verified,
        jwt: token
      }, {
        where: {
          googleId: profile.id
        }
      }).then((result) => {
        if (result[0] === 1) {
          console.log("Google signIn Successful and Database Data updated successfully");
        } else {
          console.log("Google signIn Successful but no changes were made to Database Data");
        }
      }).catch((error) => {
        console.error("Error updating user:", error);
      });
    }


    callback(null, profile);

  }));

  passport.serializeUser((user, callback) => {
    callback(null, user.id);
  });

  passport.deserializeUser(async (id, callback) => {
    try {
      callback(null, id);
    } catch (error) {
      callback(error);
    }
  });
};

module.exports = { googleAuth };
