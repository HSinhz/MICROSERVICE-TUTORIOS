const {SubscribeMessage} = require('../rabbitMQ/index')
const {sendVerifyOTP} = require('../services/sendMail');
const sendOTP = async ( Email, OTP, KEY) => {
    sendVerifyOTP( Email, OTP);
}

module.exports = {
    sendOTP: sendOTP,
}