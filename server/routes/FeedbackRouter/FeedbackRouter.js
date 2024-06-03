const express = require("express")
const { FeedbackController, GetFeedbackController } = require("../../controllers/FeedbackController/FeedbackController")

const router = express.Router()


// POST REVIEW
router.post("/data",FeedbackController)

// GET REVIEW
router.post("/getReview",GetFeedbackController)


module.exports = router