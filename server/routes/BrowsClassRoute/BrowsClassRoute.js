const express = require("express");
const { BrowsClassController, LeftBrowsClassController } = require("../../controllers/BrowsClassController/BrowsClassController");

const router = express.Router();

// get current user details
router.post("/details",BrowsClassController)


// Filter left side data || POST
router.post("/filter",LeftBrowsClassController)


module.exports = router;