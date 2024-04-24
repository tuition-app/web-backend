const express = require('express');
const { GetClassTypeController } = require('../../controllers/GetClassTypeController/GetClassTypeController');

const router = express.Router();


// get class type
router.get("/data",GetClassTypeController)


module.exports = router;