const express = require("express");
const { ForgotPasswordController, ResetPasswordController, ChangePasswordController } = require("../controllers/ForgotPasswordController");

const router = express.Router();

router.post("/password",ForgotPasswordController)

router.post("/reset",ResetPasswordController)

router.post("/changePassword",ChangePasswordController)

module.exports = router;