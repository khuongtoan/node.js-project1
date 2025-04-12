const router = require("express").Router();

const accountController = require("../../controllers/admin/account-controller");

router.get("/login", accountController.login);

router.get("/register", accountController.register);

router.post("/register", accountController.registerPost);

router.get("/forgot-password", accountController.forgotPassword);

router.get("/register-initial", accountController.registerInitial);

router.get("/otp-password", accountController.otpPassword);

router.get("/reset-password", accountController.resetPassword);

module.exports = router;
