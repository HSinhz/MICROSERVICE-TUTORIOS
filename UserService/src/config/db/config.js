const mongoose = require('mongoose');
require("dotenv").config();
async function connect(){

    try{
        await mongoose.connect('mongodb://localhost:27017/ShopOwner_Services', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect Succesfully with MongooseDB');
    } catch ( error){
        console.log('Connect Fail with MongooseDB!!!!!');
    }
}

module.exports = { 
    connect,
    MESS_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: 'DEMO_MICROSERVICES',
    AUTHOR_BINDING_KEY: 'AUTHO_SERVICE',
    ODER_BINDING_KEY: 'ODER_SERVICE'

};