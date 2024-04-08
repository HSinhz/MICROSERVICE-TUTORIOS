const express = require('express');
const router = express.Router();
const OtpController = require('../app/controllers/OtpController')

router.post('/api/verify', OtpController.verify )
router.get('/api/verify/:k', OtpController.inputOtp )
router.get('/api/reotp/:key', OtpController.reOTP)
module.exports = router;