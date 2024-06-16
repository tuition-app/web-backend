const express = require("express");
const { BrowsClassRequestController, FilterClassRequestController, BrowsClassRequestPaginationController } = require("../../controllers/BrowsClassRequestController/BrowsClassRequestController");
const router = express.Router();

// FILTER DATA || POST
router.post("/data",BrowsClassRequestController)


// FILTER DATA || POST || USING SUBJECT AND LOCATION
router.post("/filter_data",FilterClassRequestController)



// PAGINATIONS || POST
router.post("/Requestpagination",BrowsClassRequestPaginationController)

module.exports = router;