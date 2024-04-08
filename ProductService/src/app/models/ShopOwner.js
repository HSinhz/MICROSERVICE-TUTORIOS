const  mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Schema = mongoose.Schema;

const ShopOwner = new Schema({

        Name: { type:String, required: true },
        Email: { type:String, required: true },
        Password: { type:String, required: true },
        Phone: { type:String, required: true },
        Address: { type:String, required: true },
        Gender: { type: Boolean, required: true},
        Shop_Name: { type: String, required: true},
        Shop_Address: { type: String, required: true},
        Scope: { type: Boolean, required: true},
        Code_Forgot: { type: Number },
        Token_Forgot: {type: String},
        Exp_Token_Forgot: { type: String},
        Code_Verify: { type: Number},
        Token_Verify: { type: String},
        Exp_Token_Verify: { type: Number},
        Verify: { type: Boolean}
    },
    {
        timestamps: true,
    },
);


ShopOwner.pre('save', async function(next){
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

// add plugin

module.exports = mongoose.model('ShopOwner', ShopOwner); 