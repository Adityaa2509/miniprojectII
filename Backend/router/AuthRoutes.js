const express = require('express');
const { signupController, signinController, logoutController } = require('../controller/AuthController');

const router = express.Router();

router.post('/signup',signupController);
router.post('/signin',signinController);
router.post('/logout',logoutController);

module.exports = router;