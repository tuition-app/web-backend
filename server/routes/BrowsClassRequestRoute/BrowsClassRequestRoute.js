const express = require("express");
const { BrowsClassRequestController, FilterClassRequestController } = require("../../controllers/BrowsClassRequestController/BrowsClassRequestController");
const router = express.Router();

// FILTER DATA || POST
router.post("/data",BrowsClassRequestController)

// FILTER DATA || POST || USING SUBJECT AND LOCATION
router.post("/filter_data",FilterClassRequestController)


module.exports = router;