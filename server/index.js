require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const passport = require("passport");
const session = require("express-session");

const db = require("./models");

// Remove the following line as it's not necessary
const {User,Auth} = require("./models");
// const {Auth} = require("./models");

const { googleAuth } = require("./googleAuth/google.config");
const authRoute = require("./routes/authRoute");
const registerRoute = require("./routes/RegisterRouter");
const loginRoute = require("./routes/LoginRoute");
const ForgotPasswordRoute = require("./routes/ForgotPasswordRoute");
const PostAddRoute = require("./routes/PostAddRoute/PostAddRoute");
const PostClassRequestRoute = require("./routes/PostClassRequestRoute/PostClassRequestRoute");
const BrowsClassRoute = require("./routes/BrowsClassRoute/BrowsClassRoute")
const BrowsClassRequestRoute = require("./routes/BrowsClassRequestRoute/BrowsClassRequestRoute")
const GetSubjectRoute = require("./routes/GetSubjectRoute/GetSubjectRoute")
const GetDistricRoute = require("./routes/GetDistricRoute/GetDistricRoute")

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,   //reduce race condition
        saveUninitialized: false,   
        cookie: {
            secure: false,
            expires: new Date(Date.now() + 10000),   //in the static function then we can access it using it own name
            maxAge: 10000,
        }
    })
);

// Initialize Passport after express-session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/user", registerRoute);
app.use("/api/v1/user", loginRoute);
app.use("/api", authRoute);

app.use("/api/v1/forgot", ForgotPasswordRoute);

app.use("/api/v1/create", PostAddRoute);

app.use("/api/v1/create", PostClassRequestRoute);

app.use("/api/v1/middle_filter", BrowsClassRoute);
app.use("/api/v1/left_filter", BrowsClassRoute);

// BrowsClassRequestController
app.use("/api/v1/left_filter", BrowsClassRequestRoute);
app.use("/api/v1/middle_filter", BrowsClassRequestRoute);


// get subject data
app.use("/api/v1/subject", GetSubjectRoute);
app.use("/api/v1/district", GetDistricRoute);


// app.get("/", (req, res, next) => {
//     res.send("<a href='http://localhost:3000/api/auth/google'>Login with Google</a>");
//     next();
// });

db.sequelize.sync().then(() => {
    console.log("SQL database is connected");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    googleAuth(passport);
});
