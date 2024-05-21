const express = require("express");
const { GetDistricController, getSelectedAllOptionDistricts } = require("../../controllers/GetDistricController/GetDistricController");
const router = express.Router();


router.get("/data",GetDistricController)

router.get("/selectAllSubject",getSelectedAllOptionDistricts)



module.exports = router;