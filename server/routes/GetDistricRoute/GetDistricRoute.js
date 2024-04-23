const express = require("express");
const { GetDistricController } = require("../../controllers/GetDistricController/GetDistricController");
const router = express.Router();


router.get("/data",GetDistricController)



module.exports = router;