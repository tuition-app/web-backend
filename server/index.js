require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

const http = require('http');
const WebSocket = require('ws');

const passport = require("passport");
const session = require("express-session");

const db = require("./models");

// Remove the following line as it's not necessary
const { User, Auth } = require("./models");
// const {Auth} = require("./models");

// const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`You sent: ${message}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});



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
const GetPlatformRoute = require("./routes/GetPlatformRoute/GetPlatformRoute")
const GetClassTypeRoute = require("./routes/GetClassTypeRoute/GetClassTypeRoute")
const MessageRoute = require("./routes/MessageRoute/MessageRoute")
const ReplyRoute = require("./routes/RepliedRoute/RepliedRoute")

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

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello World"
    })
})

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

// get distric data
app.use("/api/v1/district", GetDistricRoute);

// get platform data
app.use("/api/v1/platform", GetPlatformRoute);

// get class Route
app.use("/api/v1/class", GetClassTypeRoute);


// post messages
app.use("/api/v1/post_message", MessageRoute)

// Reply message
app.use("/api/v1/send", ReplyRoute)

const PORT = process.env.PORT || 5000;



db.sequelize.sync().then(() => {
    console.log("SQL database is connected");
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    googleAuth(passport);
});
