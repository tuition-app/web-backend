const express = require('express');
const { GetSubjectController } = require('../../controllers/GetSubjectController/GetSubjectController');

const router = express.Router();


router.get("/data",GetSubjectController)


module.exports = router;