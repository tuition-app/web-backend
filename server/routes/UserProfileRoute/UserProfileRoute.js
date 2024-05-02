const express = require('express');
const { UserProfileController } = require('../../controllers/UserProfileController/UserProfileController');


const router = express.Router();

// POST || post user profile data
router.post("/user_details",UserProfileController)


module.exports = router;