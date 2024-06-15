const express = require("express");
const { BrowsClassController, LeftBrowsClassController, getOneDetailsController, getConsideringPostController, BrowsClassPaginationController } = require("../../controllers/BrowsClassController/BrowsClassController");

const router = express.Router();

// get current user details
router.post("/details",BrowsClassController)


// Filter left side data || POST
router.post("/filter",LeftBrowsClassController)


// POST || class details
router.post("/OneDetails",getOneDetailsController)


// POST || get considering people post
router.post("/consideringPost",getConsideringPostController)


// POST || pagination
router.post("/pagination",BrowsClassPaginationController)



module.exports = router;