const express = require("express");
const { PostClassRequestController, GetClassRequestController, GetNotificationController } = require("../../controllers/PostClassRequestController/PostClassRequestController");
const router = express.Router();

// POST || CREATE CLASS REQUEST
router.post("/request",PostClassRequestController)


// GET || GET CREATED CLASS REQUEST
router.get("/get-request",GetClassRequestController)


// GET || GET CREATED CLASS REQUEST
router.get("/get-notification",GetNotificationController)


module.exports = router;