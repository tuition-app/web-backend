const express = require('express');
const { UserProfileController, UserProfileEditController, GetUserProfileEditDataController } = require('../../controllers/UserProfileController/UserProfileController');
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

// POST || post user profile data
router.post("/user_details", UserProfileController)


// POST || edit user Profile
router.post("/edit_user_details", upload.fields([{ name: 'profileImage' }, { name: 'nicImage' }]), UserProfileEditController);


// POST || get edited data
router.post("/get_edited_data", GetUserProfileEditDataController)


module.exports = router;