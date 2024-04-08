const  mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const mongooseSequence = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Account = new Schema(
    {
        Name: { type:String, required: true },
        Email: { type:String, required: true },
        Password: { type:String, required: true },
        Phone: { type:String, required: true },
        Address: { type:String, required: true },
        Gender: { type: Boolean, required: true},
        Shop_Name: { type: String, required: true},
        Shop_Address: { type: String, required: true},
        Scope: { type: Boolean, default: false},
        Code_Forgot: { type: Number },
        Token_Forgot: {type: String},
        Exp_Token_Forgot: { type: String},
        Code_Verify: { type: Number},
        Token_Verify: { type: String},
        Exp_Token_Verify: { type: Number},
        Verify: { type: Boolean, default: false},
        access_token: {type: String},
        refresh_token: {type: String},
        roleId: {type: Number , default: 1 }
    },
    {
        timestamps: true,
    },
);


// Tự động tăng userId
// Account.plugin(mongooseSequence, {inc_field: 'userId'});

Account.pre('save', async function(next){
    try{
        const salt = await bcryptjs.genSalt(10);
        const passwordHashed = await bcryptjs.hash(this.password, salt);
        this.password = passwordHashed;
        return false;
    } catch ( error){
        next(error);
    }
})

// add plugin

module.exports = mongoose.model('Account', Account); 