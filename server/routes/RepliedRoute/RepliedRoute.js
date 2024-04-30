const express = require("express")
const { ReplyController, GetReplyController } = require("../../controllers/RepliedController/RepliedController")
const router = express.Router()

// POST || reply
router.post("/reply",ReplyController)


// GET || reply
router.post("/UserReply",GetReplyController)


module.exports  = router