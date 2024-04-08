const  mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;

const Employee = new Schema({
    ShopId : { type: ObjectId},
    OrderId: { type: ObjectId},
    Id: { type: Number},
    Name: { type: String, required: true },
    Password: { type: String, required: true},
    Phone: { type: String, required: true},
    Email: { type: String, required: true},
    Online: { type: Boolean, required: true},
    Description: { type: String}

})

Employee.pre('save', async function(next){
    try{
        console.log('password: ', this.Password)
        const salt = await bcryptjs.genSalt(10);
        console.log('salt: ' , salt);
        const passwordHashed = await bcryptjs.hash(this.Password, salt);
        console.log('passwordHashed: ',passwordHashed);
        this.Password = passwordHashed;
        return false;
    } catch ( error){
        next(error);
    }
})

module.exports = mongoose.model('Employee', Employee); 