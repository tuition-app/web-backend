const express = require("express");
const { PostClassRequestController, GetClassRequestController, GetNotificationController, acceptedController, deleteController, retainController, GetAllClassRequestController } = require("../../controllers/PostClassRequestController/PostClassRequestController");
const router = express.Router();

// POST || CREATE CLASS REQUEST
router.post("/request",PostClassRequestController)


// GET || GET CREATED CLASS REQUEST
router.get("/get-request",GetClassRequestController)


// GET || GET CREATED CLASS REQUEST
router.post("/get-notification",GetNotificationController)


router.post("/accept-request",acceptedController)

router.post("/delete-request",deleteController)

router.post("/retain-request", retainController)

router.get("/all-request", GetAllClassRequestController)


module.exports = router;