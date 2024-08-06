const express = require("express");
const { AdvertisementAddController,  GetAdvertisementController, GetSingleAdvertisementController} = require("../../controllers/AdvertisementController/AdvertisementController");
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

router.post("/post" ,upload.single('image') , AdvertisementAddController)

router.get("/get", GetAdvertisementController)

router.get("/get-one", GetSingleAdvertisementController)


module.exports = router;
