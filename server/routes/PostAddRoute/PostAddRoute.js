const express = require("express");
const { PostAddController, GetPostAddController,imageUploadController, acceptedController, deleteController, retainController, GetAllPostController } = require("../../controllers/PostAddController/PostAddController");
const multer = require('multer');
const path = require('path');

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image')
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

// POST || POST CREATE DATA
router.post("/post" ,upload.single('image') ,PostAddController)

// GET || GET DATA
router.get("/get-post",GetPostAddController)

router.post("/accept-post",acceptedController)

router.post("/delete-post",deleteController)

router.post("/retain-post", retainController)

router.get("/all-post", GetAllPostController)


// // Upload images
// router.post("/upload", upload.single('image') , imageUploadController)




module.exports = router;