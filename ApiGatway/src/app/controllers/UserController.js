const Course = require('../models/Course');
const registerService = require('../../services/registerService');
const { mongooseToObject } = require('../../util/mongoose');

class UserController {
    
    // [GET] /course/:slug
    show(req, res , next){
        return res.status(200).json({
            data: 'Hieusinh'
        })
    }

    // [POST] /api/v1/register
    async register( req, res, next){
        try {
            // req.body = email, password, name, address, phone, shopName, shopAddress
            if( !req.body.email || !req.body.password ){
                return res.status(200).json({
                    ErrorMess: 'Missing',
                    ErrorCode: '1',
                })
            }   

            let data = await registerService.sendDataUserRegister( req.body);
            return res.status(200).json({
                ErrorMess: data.EM,
                ErrorCode: data.EC
            })
        } catch (error){
            return res.status(500).json({
                ErrorMess: 'Error from server',
                ErrorCode: '-1',
            })
        }
       
    }
    
}

module.exports = new UserController;