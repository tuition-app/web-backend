const express = require("express");
const { PostAddController, GetPostAddController } = require("../../controllers/PostAddController/PostAddController");
const router = express.Router();

// POST || POST CREATE DATA
router.post("/post",PostAddController)

// GET || GET DATA
router.get("/get-post",GetPostAddController)




module.exports = router;