const express = require('express');
const { MessageController, MessageDataController } = require('../../controllers/MessageController/MessageController');
const router = express.Router();


// POST || messages
router.post("/data",MessageController)

// POST || messages
router.post("/messageData",MessageDataController)



module.exports = router;