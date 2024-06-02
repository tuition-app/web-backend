const express = require("express")
const { FeedbackController } = require("../../controllers/FeedbackController/FeedbackController")

const router = express.Router()


// POST REVIEW
router.post("/data",FeedbackController)


module.exports = router