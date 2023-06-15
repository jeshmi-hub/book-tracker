const userCtrl = require("../controller/user");
const express = require("express");
const router = express.Router();
const validation = require('../validation/validation');

router.post("/register", validation, userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/logout",userCtrl.logout);
router.get("/refresh_token",userCtrl.refreshToken);
router.get("/users/:userId/verify/:token", userCtrl.verifiedVerification);
router.post("/verifyOTP", userCtrl.verifyOTP);
router.post("/resendVerificationCode",userCtrl.resendOTPVerificationCode);



module.exports = router;