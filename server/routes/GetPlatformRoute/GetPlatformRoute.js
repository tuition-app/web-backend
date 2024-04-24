const express = require('express');
const { GetPlatformController } = require('../../controllers/GetPlatformController/GetPlatformController');
const router = express.Router();


// get platform
router.get("/data",GetPlatformController)


module.exports = router;