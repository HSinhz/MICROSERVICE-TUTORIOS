require("dotenv").config();
const jwt = require('jsonwebtoken');
const Account = require('../app/models/Account');

const createToken = ( payload ) => {
    let keyAccess = process.env.JWT_SECRET;
    let accessToken = null;
    try{
        accessToken = jwt.sign(payload, keyAccess);
    } catch ( err ){
        console.log(err);
    }
    return accessToken;
}



const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try{
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
}


module.exports = {
    createToken,
    verifyToken,
    
}