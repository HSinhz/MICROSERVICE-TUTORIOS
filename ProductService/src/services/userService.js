// require("dotenv").config();
// const bcryptjs = require('bcryptjs');
// const JWTService = require('./JWTService');
// const { createJWT, verifyToken } = require('../middleware/jwtacction');
// async function handlerLogin(username, password) {
//     return new Promise( async ( resolve, reject) => {
//         try{
//             let userData = {};
//             let isExist = await checkUserName(username);
//             if( isExist){
//                 // Tồn tài email
//                 // Compare password
//                 let user = await Account.findOne({
//                     username: username,
//                 });

//                 console.log( user );

//                 if( user ){
//                     // Compare password
//                     let checkpass =  bcryptjs.compareSync( password, user.password);
//                     if( checkpass){

//                         // let token =
                        
//                         // test role\
//                         const roles = await JWTService.getRoleUser(user);
//                         let payload = {
//                             email: user.username,
//                             roles,
//                             expiresIn: process.env.JWT_EXPIRES_IN
//                         }

//                         let token = createJWT(payload);
                       
//                         userData = {
//                             errCode :0,
//                             errMess : 'Đăng nhập thành công',
//                             access_token: token,
//                             roles
                            
//                         }
                        
//                     } else {
//                         userData.errCode = 3;
//                         userData.errMess = 'Sai mật khẩu';
//                     }
//                 } else {
//                     userData.errCode = 2;
//                     userData.errMess = 'Email của bạn không tồn tại. Vui lòng nhập lại Email';
//                 }
//             } else {
//                 // return error
//                 userData.errCode = 1;
//                 userData.errMess = 'Email của bạn không tồn tại. Vui lòng nhập lại Email';
//             }

//             resolve(userData);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// function handlerRegister( username, userData ) {
//     return new Promise( async ( resolve, reject) => {
//         try{
//             const result = {};
//             let isExist = await checkUserName( username );
//             if( isExist ) {  
//                 result.errCode = 0;
//                 result.errMess = 'Email đã tồn tại';
//             } else {
//                 const user =await new Account( userData );
//                 user
//                     .save()
//                     .then( 
//                         result.errCode = 1,
//                         result.errMess = 'Đăng kí thành công' 
//                     )
//             }
//             resolve(result);
//         } catch (e) {
//             reject(e);
//         }
//     })
// }

// let checkUserName = ( email ) => {
//     return new Promise( async (resolve, reject) => {
//         try{
//             let user = await Account.findOne( 
//                 { username: email }
//             )
//             if( user ){
//                 resolve(true);
//             } else {
//                 resolve(false);
//             }
//         } catch (e){
//             reject(e);
//         }
//     })
// }

// let compareUserPassword =( password) => {
//     return new Promise(( resolve, reject ) => {
//         try{
            
//         } catch (e){
//             reject(e);
//         }
//     })
// }
// module.exports = {
//     handlerLogin: handlerLogin,
//     handlerRegister: handlerRegister
// }