const express = require("express")
const { FeedbackController, GetFeedbackController, GetOnePostOverallReview } = require("../../controllers/FeedbackController/FeedbackController")

const router = express.Router()


// POST REVIEW
router.post("/data",FeedbackController)

// GET REVIEW
router.post("/getReview",GetFeedbackController)

// GET ONE POST FEEDBACK 
router.post("/getOneReview",GetOnePostOverallReview)


module.exports = router