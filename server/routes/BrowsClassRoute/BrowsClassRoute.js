const express = require("express");
const { BrowsClassController, LeftBrowsClassController, getOneDetailsController } = require("../../controllers/BrowsClassController/BrowsClassController");

const router = express.Router();

// get current user details
router.post("/details",BrowsClassController)


// Filter left side data || POST
router.post("/filter",LeftBrowsClassController)


// GET || class details
router.post("/OneDetails",getOneDetailsController)


module.exports = router;