const ShopOwner = require('../app/models/ShopOwner');
const {generateOTP} = require('../util/createOTP');
const {sendOTP} = require('../rabbitMQ/sendOTP');
const {SEND_MAIL_KEY} = require('../config/db/rabitMQ');


async function handlerOTPRegister (userData){
    return new Promise ( async ( resolve, reject ) => {
        try{
            let data = {};
            let shopOwner = await ShopOwner.findOne( { Email: userData.Email})
            let currentTime = Date.now();
            // Kiểm tra mã có đúng
            if( shopOwner ){
                if( shopOwner.Verify ){
                    data = {
                        Success: false,
                        Mess: 'ShopOwner has been valid'
                    }
                } else if( currentTime > shopOwner.ExpVerify) {
                    data = {
                        Success: false,
                        Mess: 'OTP is not valid',
                    }
                } else if( currentTime < shopOwner.ExpVerify ){
                    if( userData.Otp == shopOwner.Code_Verify){
                        ShopOwner.updateOne({ Email: userData.Email}, {
                            $set: {
                                Verify: true
                            }
                        }).then(() => console.log('ShopOwner created Successfully'));
                        data = {
                            Success: true,
                            Mess: 'ShopOwner created Successfully'
                        }
                    } else {
                        data = {
                            Success: false,
                            Mess: 'OTP incorrect'
                        }
                    }
                }
            } else {
                data = {
                    Success: false,
                    Mess: 'User does not exist'
                }
            }
            
            resolve(data)
        } catch ( e ){
            reject( e);
        }
    })
}



async function reOTP( key ){
    return new Promise ( async ( resolve, reject ) => {
        try {
            let shopOwner = await ShopOwner.findOne( { URIVerify: key})
            console.log("Uri : ",shopOwner.URIVerify);
            console.log("shopOwner: ", shopOwner)
            if( shopOwner ){
                const OTPObj = generateOTP();
                let message = {
                    Email: shopOwner.Email,
                    OTP: OTPObj.OTP,
                } 

                await ShopOwner.updateOne({URIVerify: key}, {
                    $set: {
                        Code_Verify: OTPObj.OTP,
                        ExpVerify: OTPObj.ExpVerify,
                    }
                })

                sendOTP(message, SEND_MAIL_KEY);
                data  = {
                    Success: true,
                    MESS: 'OTP sent successfully',
                };
            } else {
                data  = {
                    Success: false,
                    MESS: 'User is not exist',
                };
            }
            
            resolve(data);
        } catch ( error ){
            reject( error)
        }
    })
}

module.exports = {
    reOTP: reOTP,
    handlerOTPRegister: handlerOTPRegister,
}