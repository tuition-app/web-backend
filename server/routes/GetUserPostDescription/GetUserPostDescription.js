const express = require("express");
const { GetUserPostDescriptionController } = require("../../controllers/GetUserPostDescriptionController/GetUserPostDescriptionController");
const router = express.Router();


// GET || description
router.post("/description",GetUserPostDescriptionController)



module.exports = router;