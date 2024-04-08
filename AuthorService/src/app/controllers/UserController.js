const userService = require('../../services/userService');
const { mongooseToObject } = require('../../util/mongoose');
const {receivedOTP} = require('../../rabbitMQ/receivedOTP')

class UserController {

    index(req, res, next) /* Đang ở controller */ {
        return res.status(200).json({
            MESS: 'this is home page'
        })
    }


    // [POST] /user/api/v1/login
    async handlerLogin(req, res , next){
        let email = req.body.email;
        let password = req.body.password ;

        if( !email || !password ){
            return res.status(400).json({
                Success: false,
                Mess: "Email or Password is not exist"
            })
        }
        let data = await userService.handlerLogin( email, password );
        return res.status(200).json(data);
    } 

    
        
}

module.exports = new UserController();