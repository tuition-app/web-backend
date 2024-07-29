const express = require('express');
const { MessageController, MessageDataController, ChatListController,MarkMessagesAsRead } = require('../../controllers/MessageController/MessageController');
const router = express.Router();


// POST || messages
router.post("/data",MessageController)

// POST || messages
router.post("/messageData",MessageDataController)


router.post("/chatList", ChatListController)

router.post('/markAsRead', MarkMessagesAsRead); 


module.exports = router;