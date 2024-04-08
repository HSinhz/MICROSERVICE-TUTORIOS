const RABBIT_MQ = require('../config/rabbitMQ');
const {publish} = require('../rabbitMQ/publish');

const sendDataUserRegister = async (userData) => {
    try {
        console.log("Services", userData);
        publish(userData, RABBIT_MQ.USER_SERVICE);
        return data = {
            ER: 1,
            EM: 'Send User Data Register to UserService Successfully'
        }
    } catch (error){

    }
}

module.exports = {
    sendDataUserRegister: sendDataUserRegister,
}