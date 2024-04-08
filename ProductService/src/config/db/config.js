const mongoose = require('mongoose');

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

module.exports = { connect };