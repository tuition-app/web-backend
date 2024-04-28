const express = require('express');
const { MessageController } = require('../../controllers/MessageController/MessageController');
const router = express.Router();


// POST || messages
router.post("/data",MessageController)

// GET || messages
// router.post("/messageData",MessageDataController)



module.exports = router;